import { IssueStatusModel } from "./../../../../models/IssueStatus.model";
import { Component, OnInit, Self } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { IssueService } from "../services/issue.service";
import { CenterModel } from "src/app/staff/models/center.model";
import { CenterService } from "src/app/staff/services/center/center.service";
import { IssuePriorityModel } from "src/app/staff/models/issuePriority.model";
import { AuthService } from "src/app/auth/services/auth/auth.service";

@Component({
	selector: "app-add-issue",
	templateUrl: "./add-issue.component.html",
	styleUrls: ["./add-issue.component.sass"],
})
export class AddIssueComponent implements OnInit {
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
	}

	send(): void {
		if (this.Form.title != null && this.Form.description != null && this.Form.priority_id != null && this.Form.center_id != null) {
			this.issueService.create(this.Form).subscribe(
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
}
