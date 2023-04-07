import { Component, OnInit, Self } from "@angular/core";
import { CenterModel } from "../../../../models/center.model";
import { PriorityModel } from "../../../../models/priority.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { PriorityService } from "src/app/traffic/services/priority/priority.service";
import { PostService } from "src/app/traffic/services/post/post.service";
import { CenterService } from "src/app/traffic/services/center/center.service";
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
	Form = {
		title: null,
		FilesDefer: "",
		content: null,
		priority_id: 1,
		center_id: 1,
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

	onUploadFilesComplete(event: any) {
		this.Form.FilesDefer = JSON.stringify(event);
	}

	send(): void {
		if (this.Form.title != null && this.Form.content != null && this.Form.center_id != null && this.Form.priority_id != null) {
			this.http.post(this.apiUrl, this.Form).subscribe(
				(res) => {
					this.dialogRef.close();
					location.reload();
				},
				(err) => {
					this.snackBar.open("Něco se pokazilo.", "X", { panelClass: ["error"] });
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
