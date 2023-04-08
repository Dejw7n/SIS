import { Component, EventEmitter, Output } from "@angular/core";
import { HttpClient, HttpEventType } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { FileService } from "src/app/traffic/services/file/file.service";
@Component({
	selector: "app-upload-files",
	templateUrl: "./upload-files.component.html",
	styleUrls: ["./upload-files.component.sass"],
})
export class UploadFilesComponent {
	FILE_API_URL = environment.API_URL + "/file";

	@Output() onUploadFilesComplete = new EventEmitter<any>();

	files: File[] = [];
	uploadStatus: string = "waiting";
	progress: number = 0;
	isRemainingTime: boolean = false;
	remainingTime: number = 0;
	uploadingSpeed: number = 0;

	constructor(private fileService: FileService, private http: HttpClient) {}

	onFileSelected(event: any): void {
		this.files = event.target.files;
		this.onUpload();
	}

	onUpload(): void {
		if (this.files.length === 0) {
			return;
		}
		this.uploadStatus = "uploading";
		this.progress = 0;
		this.isRemainingTime = false;
		this.remainingTime = 0;
		this.uploadingSpeed = 0;
		let uploadedBytes = 0;
		let totalBytes = 0;

		const formData = new FormData();
		for (let i = 0; i < this.files.length; i++) {
			formData.append("files[]", this.files[i]);
		}

		const uploadReq = this.http.post(this.FILE_API_URL + "/upload", formData, {
			reportProgress: true,
			observe: "events",
		});

		let lastUploadedBytes = uploadedBytes;
		let uploadNotResponding = 0;
		const interval = setInterval(() => {
			if (this.uploadStatus !== "uploading") {
				clearInterval(interval);
			}
			this.uploadingSpeed = uploadedBytes - lastUploadedBytes;
			if (this.uploadingSpeed > 0) {
				this.isRemainingTime = true;
				uploadNotResponding = 0;
				this.remainingTime = (totalBytes - uploadedBytes) / (this.uploadingSpeed / 4);
			} else {
				uploadNotResponding++;
				if (uploadNotResponding > 4) {
					this.remainingTime = 0;
				}
			}
			lastUploadedBytes = uploadedBytes;
		}, 4000);
		const interval2 = setInterval(() => {
			if (this.uploadStatus !== "uploading") {
				clearInterval(interval2);
			}
			if (this.remainingTime > 0) {
				if (uploadNotResponding <= 2) {
					this.remainingTime--;
				}
			}
		}, 1000);

		uploadReq.subscribe(
			(event) => {
				if (event.type === HttpEventType.UploadProgress) {
					this.progress = Math.round(100 * (event.loaded / (event.total || 0)));
					uploadedBytes = event.loaded;
					totalBytes = event.total || 0;
				} else if (event.type === HttpEventType.Response) {
					console.log(event.body);
					this.onUploadFilesComplete.emit(event.body);
					this.uploadStatus = "completed";
				}
			},
			(error) => {
				console.log(error);
				this.uploadStatus = "error";
			}
		);
	}

	getUploadingSpeed(): string {
		let uploadingSpeedMb = this.uploadingSpeed / 1048576;
		if (uploadingSpeedMb > 0) {
			return uploadingSpeedMb.toFixed(1) + " MB/s";
		} else {
			return "";
		}
	}

	getRemainingTime(): string {
		if (this.remainingTime !== 0) {
			let convertTime = this.convertTime(this.remainingTime);
			if (convertTime !== "") {
				return this.convertTime(this.remainingTime);
			}
		}
		return "";
	}

	convertTime(timeInSeconds: number): string {
		let result = "";
		if (timeInSeconds > 3600) {
			let hours = Math.floor(timeInSeconds / 3600);
			result += `${hours}h `;
			timeInSeconds %= 3600;
		}
		if (timeInSeconds > 60) {
			let minutes = Math.floor(timeInSeconds / 60);
			result += `${minutes}m `;
			timeInSeconds %= 60;
		}
		if (timeInSeconds > 0) {
			result += `${timeInSeconds.toFixed(0)}s `;
		}
		if (result.includes("Infinity")) {
			return "";
		}
		return result;
	}

	humanFileSize(size: number) {
		this.fileService.getHumanFileSize(size);
	}

	getUploadStatus() {
		return this.uploadStatus;
	}
	getProgressColor() {
		if (this.getUploadStatus() == "error") {
			return "#FF0000"; //red
		} else {
			if (this.getUploadStatus() == "completed") {
				return "#4ade80"; //green
			} else {
				if (this.getUploadStatus() == "uploading") {
					return "#3b82f6"; //blue
				} else {
					return "#9ca3af"; //gray
				}
			}
		}
	}
}
