import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import * as bcrypt from "bcryptjs";

@Injectable({
	providedIn: "root",
})
export class UserService {
	private apiUrl: string = environment.API_URL + "/user";
	headers = { "content-type": "application/json" };

	constructor(private http: HttpClient) {}

	getAllUsers(): Observable<any> {
		return this.http.get<any>(this.apiUrl, { headers: this.headers });
	}
	getUser(userId: number): Observable<any> {
		return this.http.get<any>(this.apiUrl + "/" + userId, { headers: this.headers });
	}
	getMyData(): Observable<any> {
		return this.http.post<any>(this.apiUrl + "/getMyData", {});
	}
	getAllRoles(): Observable<any> {
		return this.http.get(this.apiUrl + "/getAllRoles", {});
	}
	createUser(userData: any) {
		if (userData.password) {
			// Generate a salt (a random string used in the hashing process)
			//const saltRounds = 10;
			//const salt = bcrypt.genSaltSync(saltRounds);
			//const hashedPassword = bcrypt.hashSync(userData.password, salt);
			//userData.password = hashedPassword;
		}
		return this.http.post(this.apiUrl, userData);
	}
	editUser(userId: number, userData: any): Observable<any> {
		if (userData.password) {
			// Generate a salt (a random string used in the hashing process)
			const saltRounds = 10;
			const salt = bcrypt.genSaltSync(saltRounds);
			const hashedPassword = bcrypt.hashSync(userData.password, salt);
			userData.password = hashedPassword;
		}
		return this.http.put(this.apiUrl + "/" + userId, userData);
	}
	deleteUser(userId: number): Observable<any> {
		return this.http.delete(this.apiUrl + "/" + userId);
	}
}
