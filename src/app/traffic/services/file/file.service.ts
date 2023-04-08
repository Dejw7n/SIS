import { HttpClient, HttpEvent, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { environment } from "../../../../environments/environment";

@Injectable({
	providedIn: "root",
})
export class FileService {
	private FILE_API_URL = environment.API_URL + "/file";
	constructor(private http: HttpClient) {}
	headers = { "content-type": "application/json" };

	getFileSizeLimit() {
		return this.http.get(`${this.FILE_API_URL}/fileSizeLimit`);
	}

	getFiles(): Observable<any> {
		return this.http.get(`${this.FILE_API_URL}`);
	}

	download(id: number) {
		this.http.get<any>(this.FILE_API_URL + "/" + id, { responseType: "json" }).subscribe((res) => {
			let fileName = res.name;
			this.http.get(this.FILE_API_URL + "/" + id + "/download", { responseType: "blob" }).subscribe((blob) => {
				const file = new Blob([blob], { type: "application/" + blob.type });
				const fileURL = URL.createObjectURL(file);
				const a = document.createElement("a");
				a.style.display = "none";
				document.body.appendChild(a);
				a.href = fileURL;
				a.download = fileName;
				a.click();
				window.URL.revokeObjectURL(fileURL);
				document.body.removeChild(a);
			});
		});
	}

	getHumanFileSize(bytes: number, si = false, dp = 1) {
		const thresh = si ? 1000 : 1024;

		if (Math.abs(bytes) < thresh) {
			return bytes + " B";
		}

		const units = si ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"] : ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
		let u = -1;
		const r = 10 ** dp;

		do {
			bytes /= thresh;
			++u;
		} while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

		return bytes.toFixed(dp) + " " + units[u];
	}
}
