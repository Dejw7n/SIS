import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root",
})
export class CenterService {
	private centerApiUrl = environment.API_URL + "/center/";
	private headers = { "content-type": "application/json" };

	constructor(private http: HttpClient) {}

	getAllCenters(): Observable<any> {
		return this.http.post(this.centerApiUrl + "getCenters", {}, { headers: this.headers });
	}
}
