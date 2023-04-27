import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root",
})
export class PriorityService {
	private priorityApiUrl = environment.API_URL + "/priority";
	private headers = { "content-type": "application/json" };

	constructor(private http: HttpClient) {}

	getAllPriorities(): Observable<any> {
		return this.http.get(this.priorityApiUrl, { headers: this.headers });
	}
}
