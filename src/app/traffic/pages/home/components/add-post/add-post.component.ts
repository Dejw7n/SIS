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

class DialogData {}

@Component({
	selector: "app-add-post",
	templateUrl: "./add-post.component.html",
	styleUrls: ["./add-post.component.sass"],
})
export class AddPostComponent implements OnInit {
	private apiUrl: string = environment.API_URL + "/PostApi/";

	centers: CenterModel[] = [];
	priorities: PriorityModel[] = [];
	Form = {
		TitleInput: null,
		FilesDefer: "",
		TextInput: null,
		PriorityInput: 1,
		CenterInput: 1,
	};

	constructor(private centerService: CenterService, private priorityService: PriorityService, private postService: PostService, private http: HttpClient, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<Self>) {}

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
		if (this.Form.TitleInput != null && this.Form.TextInput != null && this.Form.CenterInput != null && this.Form.PriorityInput != null) {
			this.http.post(this.apiUrl + "createPost", this.Form).subscribe();
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
