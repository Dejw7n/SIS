import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { AuthService } from "src/app/core/services/auth/auth.service";

@Injectable({
	providedIn: "root",
})
export class PostService {
	private postApiUrl = environment.API_URL + "/post";
	private filePostApiUrl = environment.API_URL + "/file";
	private headers = { "content-type": "application/json" };

	constructor(private authService: AuthService, private http: HttpClient) {}

	getAllPosts(): Observable<any> {
		return this.http.get(this.postApiUrl + "", {});
	}
	getPost(postId: number): Observable<any> {
		return this.http.get(this.postApiUrl + "/" + postId, {});
	}
	getFilesOfPost(postId: number): Observable<any> {
		return this.http.get(this.filePostApiUrl + "/" + postId, {});
	}
	editPost(postId: number, postData: any) {
		postData.userId = this.authService.getUserData().id;
		this.http.put(this.postApiUrl + postId, postData).subscribe();
	}
	deletePost(postId: number) {
		this.http.delete(this.postApiUrl + postId).subscribe();
	}
}
