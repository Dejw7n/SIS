import { Component, OnInit, Self } from "@angular/core";
import { CenterModel } from "src/app/staff/models/center.model";
import { PriorityModel } from "src/app/staff/models/priority.model";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { PriorityService } from "src/app/staff/services/priority/priority.service";
import { PostService } from "src/app/staff/services/post/post.service";
import { CenterService } from "src/app/staff/services/center/center.service";

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
		content: null,
		priority_id: null,
		center_id: null,
		monitors: false,
	};

	constructor(private centerService: CenterService, private priorityService: PriorityService, private postService: PostService, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<Self>) {}

	ngOnInit(): void {
		this.postService.getPost(this.postId).subscribe((res) => {
			this.postData = res;
			this.Form = {
				title: this.postData.title,
				content: this.postData.content,
				priority_id: this.postData.priority_id,
				center_id: this.postData.center_id,
				monitors: this.postData.monitors,
			};
		});
		this.centerService.getAllCenters().subscribe((res) => {
			this.centers = res;
		});
		this.priorityService.getAllPriorities().subscribe((res) => {
			this.priorities = res;
		});
	}

	send(): void {
		if (this.Form.title != null && this.Form.content != null && this.Form.center_id != null && this.Form.priority_id != null && this.Form.monitors != null) {
			this.postService.update(this.postId, this.Form).subscribe(
				(res) => {
					this.dialogRef.close();
					location.reload();
				},
				(error) => {
					this.snackBar.open("Chyba při odesílání formuláře.", "X", { panelClass: ["error"] });
				}
			);
		} else {
			this.snackBar.open("Nejsou vyplněny všechny povinné údaje.", "X", { panelClass: ["error"] });
		}
	}
}
