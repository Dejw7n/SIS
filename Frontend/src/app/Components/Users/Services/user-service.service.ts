import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({
	providedIn: "root",
})
export class UserServiceService {
	private apiUrl: string = environment.API_URL + "/UserApi/";

	constructor(private http: HttpClient) {}

	getAllUser(): Observable<any> {
		const headers = { "content-type": "application/json" };
		return this.http.post<any>(this.apiUrl + "getAllUsers", {}, { headers: headers });
	}
	getMyData(): Observable<any> {
		return this.http.post<any>(this.apiUrl + "getMyData", {});
	}
	getData() {
		let data = JSON.parse(localStorage.getItem("userData")!);
		return data;
	}
}
