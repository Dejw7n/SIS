import { Component, OnInit, Self } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { IssueService } from "../services/issue.service";
import { AuthService } from "src/app/auth/services/auth/auth.service";
import { CenterService } from "src/app/staff/services/center/center.service";
import { IssueStatusModel } from "src/app/staff/models/IssueStatus.model";
import { IssuePriorityModel } from "src/app/staff/models/issuePriority.model";
import { CenterModel } from "src/app/staff/models/center.model";

@Component({
	selector: "app-edit-post",
	templateUrl: "./edit-issue.component.html",
	styleUrls: ["./edit-issue.component.sass"],
})
export class EditIssueComponent implements OnInit {
	issueId!: number;
	centers: CenterModel[] = [];
	issuePriorities: IssuePriorityModel[] = [];
	issueStatuses: IssueStatusModel[] = [];

	sessionData: any;
	userRole: string = "";

	Form: any = {
		title: null,
		description: null,
		priority_id: null,
		center_id: null,
	};

	constructor(private authService: AuthService, private centerService: CenterService, private issueService: IssueService, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<Self>) {
		this.sessionData = this.authService.getSessionData();
		this.userRole = this.sessionData.role;
	}

	ngOnInit(): void {
		this.centerService.getAllCenters().subscribe((res) => {
			this.centers = res;
		});
		this.issueService.getAllPriorities().subscribe((res) => {
			this.issuePriorities = res;
		});
		this.issueService.getAllStatutes().subscribe((res) => {
			this.issueStatuses = res;
		});

		this.issueService.getOneIssue(this.issueId).subscribe((res) => {
			this.Form = {
				title: res.title,
				description: res.description,
				priority_id: res.priority_id,
				center_id: res.center_id,
			};
		});
	}

	send(): void {
		if (this.Form.title != null && this.Form.description != null && this.Form.priority_id != null && this.Form.center_id != null) {
			this.issueService.update(this.issueId, this.Form).subscribe(
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
