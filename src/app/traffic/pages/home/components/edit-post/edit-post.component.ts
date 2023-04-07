import { Component, OnInit, Self } from "@angular/core";
import { CenterModel } from "src/app/traffic/models/center.model";
import { PriorityModel } from "src/app/traffic/models/priority.model";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { PriorityService } from "src/app/traffic/services/priority/priority.service";
import { PostService } from "src/app/traffic/services/post/post.service";
import { CenterService } from "src/app/traffic/services/center/center.service";

@Component({
	selector: "app-edit-post",
	templateUrl: "./edit-post.component.html",
	styleUrls: ["./edit-post.component.sass"],
})
export class EditPostComponent implements OnInit {
	postId!: number;
	postData: any;
	centers: CenterModel[] = [];
	priorities: PriorityModel[] = [];
	Form = {
		title: null,
		filesDefer: "",
		content: null,
		priority_id: null,
		center_id: null,
	};

	constructor(private centerService: CenterService, private priorityService: PriorityService, private postService: PostService, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<Self>) {}

	ngOnInit(): void {
		this.postService.getPost(this.postId).subscribe((res) => {
			this.postData = res;
			this.Form = {
				title: this.postData.title,
				filesDefer: "",
				content: this.postData.content,
				priority_id: this.postData.priority_id,
				center_id: this.postData.center_id,
			};
		});
		this.centerService.getAllCenters().subscribe((res) => {
			this.centers = res;
		});
		this.priorityService.getAllPriorities().subscribe((res) => {
			this.priorities = res;
		});
	}

	onUploadFilesComplete(event: any) {
		this.Form.filesDefer = JSON.stringify(event);
	}

	send(): void {
		if (this.Form.title != null && this.Form.content != null && this.Form.center_id != null && this.Form.priority_id != null) {
			this.postService.editPost(this.postId, this.Form);
			this.dialogRef.close();
			location.reload();
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
