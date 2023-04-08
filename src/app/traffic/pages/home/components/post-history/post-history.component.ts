import { Component, Inject, LOCALE_ID, OnInit, Self } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { PostService } from "src/app/traffic/services/post/post.service";
import { formatDate } from "@angular/common";

@Component({
	selector: "app-post-history",
	templateUrl: "./post-history.component.html",
	styleUrls: ["./post-history.component.sass"],
})
export class PostHistoryComponent implements OnInit {
	postId!: number;
	postChanges: any;

	loading = {
		changes: {
			response: false,
			error: false,
		},
	};

	constructor(private postService: PostService, @Inject(LOCALE_ID) private locale: string, public dialogRef: MatDialogRef<Self>) {}

	ngOnInit(): void {
		this.postService.getPostChanges(this.postId).subscribe(
			(res) => {
				this.loading.changes.response = true;
				this.postChanges = res;
			},
			(error) => {
				this.loading.changes.error = true;
			}
		);
	}

	humanDateReadable(dateString: string) {
		return formatDate(Date.parse(dateString), "dd. MM. yyyy hh:ss", this.locale);
	}

	parseJson(json: string) {
		return JSON.parse(json);
	}

	close(): void {
		this.dialogRef.close();
	}
}
