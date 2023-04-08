import { PostModel } from "./../../../../models/post.model";
import { Router } from "@angular/router";
import { FileService } from "./../../../../services/file/file.service";
import { Component, OnInit } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { PostService } from "../../../../services/post/post.service";
import { MatDialog } from "@angular/material/dialog";
import { AddPostComponent } from "../add-post/add-post.component";
import { EditPostComponent } from "../edit-post/edit-post.component";
import { PostHistoryComponent } from "../post-history/post-history.component";
import { AuthService } from "src/app/core/services/auth/auth.service";
import { Observable } from "rxjs/internal/Observable";
import { formatDate } from "@angular/common";

@Component({
	selector: "app-main-dashboard",
	templateUrl: "./main-dashboard.component.html",
	styleUrls: ["./main-dashboard.component.sass"],
})
export class MainDashboardComponent implements OnInit {
	posts: PostModel[] = [];
	center: number = 0;
	loading = {
		posts: {
			response: false,
			error: false,
		},
	};

	userCenterId: number = 0;
	userRole: string = "";

	constructor(private authService: AuthService, private postService: PostService, private fileService: FileService, public dialog: MatDialog, private router: Router) {
		const userData = this.authService.getUserData();
		this.userCenterId = userData.center_id;
		this.userRole = userData.role;
	}

	ngOnInit(): void {
		this.postService.getAllPosts().subscribe(
			(Response) => {
				this.loading.posts.response = true;
				this.posts = Response;
			},
			(error) => {
				this.loading.posts.error = true;
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

	getReadeableDate(dateInput: Date) {
		return formatDate(dateInput, "d.M.yyyy hh:mm", "cs-CZ");
	}

	updateCenter(center: number, event: any) {
		let el = document.querySelectorAll("div[data-filter-selected]")[0];
		el.children[0].classList.replace("text-white", "text-gray-500");
		el.classList.remove("rounded-3xl");
		el.classList.remove("bg-red-600");
		el.removeAttribute("data-filter-selected");

		let element = event.currentTarget;
		element.children[0].classList.replace("text-gray-500", "text-white");
		element.classList.add("rounded-3xl");
		element.classList.add("bg-red-600");
		element.setAttribute("data-filter-selected", true);

		this.center = center;
	}

	getFilesOfPost(postId: number): Observable<any[]> {
		return this.postService.getFilesOfPost(postId);
	}

	parseJson(json: string) {
		return JSON.parse(json);
	}

	humanSizeReadable(size: number) {
		return this.fileService.getHumanFileSize(size);
	}

	downloadFile(id: number) {
		this.fileService.download(id);
	}

	deletePost(id: number) {
		this.postService.deletePost(id);
		location.reload();
	}

	openAddPosts() {
		let dialogRef = this.dialog.open(AddPostComponent, {
			height: "auto",
			width: "800px",
			panelClass: "custom-dialog-container",
		});
	}
	openHistoryPost(postId: number) {
		let dialogRef = this.dialog.open(PostHistoryComponent, {
			height: "auto",
			width: "800px",
			panelClass: "custom-dialog-container",
		});
		dialogRef.componentInstance.postId = postId;
	}
	openEditPost(postId: number) {
		let dialogRef = this.dialog.open(EditPostComponent, {
			height: "auto",
			width: "800px",
			panelClass: "custom-dialog-container",
		});
		dialogRef.componentInstance.postId = postId;
	}

	getPostFileIcon(fileName: string) {
		let extension = fileName.split(".").pop();
		return extension;
	}
}
