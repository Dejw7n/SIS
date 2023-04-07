import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root",
})
export class RoleService {
	private apiUrl: string = environment.API_URL + "/role";
	constructor(private http: HttpClient) {}
	getAllRoles(): Observable<any> {
		return this.http.get(this.apiUrl, {});
	}
}
