import { Component, OnInit, Self } from "@angular/core";
import { CenterModel } from "../../../../../staff/models/center.model";
import { PriorityModel } from "../../../../../staff/models/priority.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { PriorityService } from "src/app/staff/services/priority/priority.service";
import { PostService } from "src/app/staff/services/post/post.service";
import { CenterService } from "src/app/staff/services/center/center.service";
import { AuthService } from "src/app/core/services/auth/auth.service";

class DialogData {}

@Component({
	selector: "app-add-post",
	templateUrl: "./add-post.component.html",
	styleUrls: ["./add-post.component.sass"],
})
export class AddPostComponent implements OnInit {
	private apiUrl: string = environment.API_URL + "/post";

	centers: CenterModel[] = [];
	priorities: PriorityModel[] = [];
	uploadSession: string = "";
	Form: any = {
		title: null,
		content: null,
		priority_id: 1,
		center_id: 1,
		session_files: null,
	};

	constructor(private authService: AuthService, private centerService: CenterService, private priorityService: PriorityService, private postService: PostService, private http: HttpClient, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<Self>) {}

	ngOnInit(): void {
		this.centerService.getAllCenters().subscribe((res) => {
			this.centers = res;
		});
		this.priorityService.getAllPriorities().subscribe((res) => {
			this.priorities = res;
		});
	}

	onFileSelected(event: { target: { files: FileList } }) {
		const files: FileList = event.target.files;
		const formData = new FormData();
		for (let i = 0; i < files.length; i++) {
			formData.append(`file[${i}]`, files[i]);
		}
		// Call the API service method to upload the files
	}
	onUploadFilesComplete(event: any) {
		this.Form.session_files = event;
		console.log("onUploadFilesComplete: " + event);
	}

	send(): void {
		if (this.Form.title != null && this.Form.content != null && this.Form.center_id != null && this.Form.priority_id != null) {
			this.postService.create(this.Form).subscribe(
				(res) => {
					this.dialogRef.close();
					location.reload();
				},
				(err) => {
					this.snackBar.open("Chyba při odesílání formuláře.", "X", { panelClass: ["error"] });
				}
			);
		} else {
			this.snackBar.open("Nejsou vyplněny všechny povinné údaje.", "X", { panelClass: ["error"] });
		}
	}

	visible = false;

	open(): void {
		this.visible = true;
	}

	close(): void {
		this.visible = false;
	}
}
