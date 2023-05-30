import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "src/app/auth/services/auth/auth.service";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root",
})
export class IssueService {
	private apiUrl = environment.API_URL + "/issue";
	private apiUrlPriority = environment.API_URL + "/issuePriority";
	private apiUrlStatus = environment.API_URL + "/issueStatus";

	constructor(private http: HttpClient, private authService: AuthService) {}

	getAllIssues(): Observable<any> {
		return this.http.get(this.apiUrl + "", {});
	}
	getOneIssue(id: number): Observable<any> {
		return this.http.get(this.apiUrl + "/" + id, {});
	}
	create(data: any): Observable<any> {
		data.author_id = this.authService.getSessionData().id;
		return this.http.post(this.apiUrl, data);
	}
	update(id: number, data: any): Observable<any> {
		return this.http.put(this.apiUrl + "/" + id, data);
	}
	delete(id: number): Observable<any> {
		return this.http.delete(this.apiUrl + "/" + id);
	}

	// issuePriority.model.ts
	getAllPriorities(): Observable<any> {
		return this.http.get(this.apiUrlPriority, {});
	}
	// issueStatus.model.ts
	getAllStatutes(): Observable<any> {
		return this.http.get(this.apiUrlStatus, {});
	}
}
