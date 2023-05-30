import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { AuthService } from "src/app/auth/services/auth/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { IssueService } from "./components/services/issue.service";
import { AddIssueComponent } from "./components/add-issue/add-issue.component";
import { EditIssueComponent } from "./components/edit-issue/edit-issue.component";
import { IssueModel } from "../../models/issue.model";
import { IssuePriorityModel } from "../../models/issuePriority.model";
import { IssueStatusModel } from "../../models/IssueStatus.model";
import { ChangeStatusComponent } from "./components/change-status/change-status.component";

@Component({
	selector: "app-issues",
	templateUrl: "./issues.component.html",
	styleUrls: ["./issues.component.sass"],
})
export class IssuesComponent implements OnInit {
	issues: IssueModel[] = [];
	issuePriorities: IssuePriorityModel[] = [];
	issueStatuses: IssueStatusModel[] = [];
	loading = {
		issues: {
			response: false,
			error: false,
		},
	};

	userCenterId: number = 0;
	userRole: string = "";
	status: number = 1;
	center: number = 0;

	constructor(private snackBar: MatSnackBar, private authService: AuthService, private issueService: IssueService, public dialog: MatDialog, private router: Router) {
		const userData = this.authService.getSessionData();
		this.userCenterId = userData.center_id;
		this.userRole = userData.role;
	}

	ngOnInit(): void {
		this.issueService.getAllPriorities().subscribe((res) => {
			this.issuePriorities = res;
		});
		this.issueService.getAllStatutes().subscribe((res) => {
			this.issueStatuses = res;
		});
		this.issueService.getAllIssues().subscribe(
			(Response) => {
				this.loading.issues.response = true;
				this.issues = Response;
			},
			(error) => {
				this.loading.issues.error = true;
				if (error instanceof HttpErrorResponse) {
					if (error.status == 401) {
						this.router.navigate(["/login"]);
					}
				}
			}
		);
		// this.postService.getFilesOfPost(1).subscribe(
		// 	(Response) => {
		// 		this.postFiles.push(Response);
		// 	},
		// 	(error) => {}
		// );
	}

	deleteIssue(id: number) {
		this.issueService.delete(id).subscribe(
			(Response) => {
				location.reload();
			},
			(error) => {
				this.snackBar.open("Nepodařilo se smazat závadu", "Zavřít", {});
			}
		);
	}

	updateStatus(status: number, event: any) {
		let el = document.querySelectorAll("div[data-filter-selected-status]")[0];
		el.children[0].classList.replace("text-white", "text-gray-500");
		el.classList.remove("rounded-xl");
		el.classList.remove("bg-red-600");
		el.removeAttribute("data-filter-selected-status");

		let element = event.currentTarget;
		element.children[0].classList.replace("text-gray-500", "text-white");
		element.classList.add("rounded-xl");
		element.classList.add("bg-red-600");
		element.setAttribute("data-filter-selected-status", true);

		this.status = status;
	}

	updateCenter(center: number, event: any) {
		let el = document.querySelectorAll("div[data-filter-selected]")[0];
		el.children[0].classList.replace("text-white", "text-gray-500");
		el.classList.remove("rounded-xl");
		el.classList.remove("bg-red-600");
		el.removeAttribute("data-filter-selected");

		let element = event.currentTarget;
		element.children[0].classList.replace("text-gray-500", "text-white");
		element.classList.add("rounded-xl");
		element.classList.add("bg-red-600");
		element.setAttribute("data-filter-selected", true);

		this.center = center;
	}

	openAddIssue() {
		let dialogRef = this.dialog.open(AddIssueComponent, {
			height: "auto",
			width: "800px",
			panelClass: "custom-dialog-container",
		});
	}
	openChangeStatus(issueId: number) {
		let dialogRef = this.dialog.open(ChangeStatusComponent, {
			height: "auto",
			width: "600px",
			panelClass: "custom-dialog-container",
		});
		dialogRef.componentInstance.issueId = issueId;
	}
	openEditIssue(issueId: number) {
		let dialogRef = this.dialog.open(EditIssueComponent, {
			height: "auto",
			width: "800px",
			panelClass: "custom-dialog-container",
		});
		dialogRef.componentInstance.issueId = issueId;
	}
}
