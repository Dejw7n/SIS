import { PostModel } from "../../models/post.model";
import { Router } from "@angular/router";
import { FileService } from "../../services/file/file.service";
import { Component, OnInit } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { PostService } from "../../services/post/post.service";
import { MatDialog } from "@angular/material/dialog";
import { AuthService } from "src/app/auth/services/auth/auth.service";
import { Observable } from "rxjs/internal/Observable";
import { formatDate } from "@angular/common";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ProjectService } from "./services/project.service";
import { AddProjectComponent } from "./components/add-project/add-project.component";
import { EditProjectComponent } from "./components/edit-project/edit-project.component";
import { ProjectModel } from "../../models/project.model";

@Component({
	selector: "app-projects",
	templateUrl: "./projects.component.html",
	styleUrls: ["./projects.component.sass"],
})
export class ProjectsComponent implements OnInit {
	projects: ProjectModel[] = [];
	loading = {
		projects: {
			response: false,
			error: false,
		},
	};

	userCenterId: number = 0;
	userRole: string = "";

	constructor(private snackBar: MatSnackBar, private authService: AuthService, private projectService: ProjectService, public dialog: MatDialog, private router: Router) {
		const userData = this.authService.getUserData();
		this.userCenterId = userData.center_id;
		this.userRole = userData.role;
	}

	ngOnInit(): void {
		this.projectService.getAllProjects().subscribe(
			(Response) => {
				this.loading.projects.response = true;
				this.projects = Response;
			},
			(error) => {
				this.loading.projects.error = true;
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

	deleteProject(id: number) {
		this.projectService.deleteProject(id).subscribe(
			(Response) => {
				location.reload();
			},
			(error) => {
				this.snackBar.open("Nepodařilo se smazat příspěvek", "Zavřít", {});
			}
		);
	}

	openAddProject() {
		let dialogRef = this.dialog.open(AddProjectComponent, {
			height: "auto",
			width: "800px",
			panelClass: "custom-dialog-container",
		});
	}
	openEditProject(projectId: number) {
		let dialogRef = this.dialog.open(EditProjectComponent, {
			height: "auto",
			width: "800px",
			panelClass: "custom-dialog-container",
		});
		dialogRef.componentInstance.projectId = projectId;
	}
}
