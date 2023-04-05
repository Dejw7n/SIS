import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { UserService } from "../user/user.service";

@Injectable({
	providedIn: "root",
})
export class PostService {
	private postApiUrl = environment.API_URL + "/Post/";
	private fileApiUrl = environment.API_URL + "/FileApi/";
	private headers = { "content-type": "application/json" };

	constructor(private userService: UserService, private http: HttpClient) {}

	getAllPosts(): Observable<any> {
		return this.http.get(this.postApiUrl + "getAllPosts", {});
	}
	getPost(postId: number): Observable<any> {
		return this.http.get(this.postApiUrl + "getPost/" + postId, {});
	}
	getFilesByPostId(postId: number): Observable<any> {
		return this.http.get(this.fileApiUrl + "getFilesByPostId?postId=" + postId, {});
	}
	editPost(postId: number, postData: any) {
		postData.userId = this.userService.getData().id;
		this.http.put(this.postApiUrl + postId, postData).subscribe();
	}
	deletePost(postId: number) {
		this.http.delete(this.postApiUrl + postId).subscribe();
	}
}
