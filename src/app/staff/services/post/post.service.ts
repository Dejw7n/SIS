import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({
	providedIn: "root",
})
export class PostService {
	private postApiUrl = environment.API_URL + "/post";

	constructor(private http: HttpClient) {}

	getAllPosts(): Observable<any> {
		return this.http.get(this.postApiUrl + "", {});
	}
	getPost(postId: number): Observable<any> {
		return this.http.get(this.postApiUrl + "/" + postId, {});
	}
	getFilesOfPost(postId: number): Observable<any> {
		return this.http.get(this.postApiUrl + "/" + postId + "/files", {});
	}
	create(postData: any): Observable<any> {
		return this.http.post(this.postApiUrl, postData);
	}
	update(postId: number, postData: any): Observable<any> {
		return this.http.put(this.postApiUrl + "/" + postId, postData);
	}
	deletePost(postId: number): Observable<any> {
		return this.http.delete(this.postApiUrl + "/" + postId);
	}
	getPostChanges(postId: number): Observable<any> {
		return this.http.get(this.postApiUrl + "/" + postId + "/changes", {});
	}
}
