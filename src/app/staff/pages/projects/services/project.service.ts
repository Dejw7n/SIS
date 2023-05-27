import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "src/app/auth/services/auth/auth.service";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root",
})
export class ProjectService {
	private apiUrl = environment.API_URL + "/project";

	constructor(private http: HttpClient, private authService: AuthService) {}

	getAllProjects(): Observable<any> {
		return this.http.get(this.apiUrl + "", {});
	}
	getOneProject(projectId: number): Observable<any> {
		return this.http.get(this.apiUrl + "/" + projectId, {});
	}
	create(projectData: any): Observable<any> {
		projectData.author_id = this.authService.getUserData().id;
		return this.http.post(this.apiUrl, projectData);
	}
	update(projectId: number, projectData: any): Observable<any> {
		return this.http.put(this.apiUrl + "/" + projectId, projectData);
	}
	delete(projectId: number): Observable<any> {
		return this.http.delete(this.apiUrl + "/" + projectId);
	}
}
