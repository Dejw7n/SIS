import { Component, OnInit, Self } from "@angular/core";
import { IssueService } from "../services/issue.service";
import { IssueStatusModel } from "src/app/staff/models/IssueStatus.model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
	selector: "app-change-status",
	templateUrl: "./change-status.component.html",
	styleUrls: ["./change-status.component.sass"],
})
export class ChangeStatusComponent implements OnInit {
	issueId!: number;
	issueStatuses: IssueStatusModel[] = [];

	constructor(private issueService: IssueService, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<Self>) {}

	ngOnInit(): void {
		this.issueService.getAllStatutes().subscribe((res) => {
			this.issueStatuses = res;
		});
	}

	changeStatus(statusId: number) {
		let formData = {
			status_id: statusId,
		};
		this.issueService.update(this.issueId, formData).subscribe(
			(res) => {
				this.dialogRef.close();
				location.reload();
			},
			(err) => {
				this.snackBar.open("Chyba komunikace se serverem.", "X", { panelClass: ["error"] });
			}
		);
	}
}
