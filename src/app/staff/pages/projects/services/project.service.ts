import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root",
})
export class ProjectService {
	private apiUrl = environment.API_URL + "/project";

	constructor(private http: HttpClient) {}

	getAllProjects(): Observable<any> {
		return this.http.get(this.apiUrl + "", {});
	}
	getProject(projectId: number): Observable<any> {
		return this.http.get(this.apiUrl + "/" + projectId, {});
	}
	create(projectData: any): Observable<any> {
		return this.http.post(this.apiUrl, projectData);
	}
	update(projectId: number, projectData: any): Observable<any> {
		return this.http.put(this.apiUrl + "/" + projectId, projectData);
	}
	deleteProject(projectId: number): Observable<any> {
		return this.http.delete(this.apiUrl + "/" + projectId);
	}
}
