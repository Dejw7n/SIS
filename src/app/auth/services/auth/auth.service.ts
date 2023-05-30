import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	private apiUrl: string = environment.API_URL + "/auth/";

	constructor(private router: Router, private http: HttpClient, private jwtHelper: JwtHelperService) {}

	loginUser(user: any) {
		return this.http.post<any>(this.apiUrl + "login", user);
	}

	validateToken() {
		if (localStorage.getItem("access_token") !== null) {
			return this.http.get(this.apiUrl + "me").subscribe(
				(res) => {
					return true;
				},
				(err) => {
					return false;
				}
			);
		} else {
			return false;
		}
	}

	getSessionData() {
		const token = localStorage.getItem("access_token");
		if (token !== null) {
			const decodedToken = this.jwtHelper.decodeToken(token);
			return decodedToken.user;
		} else {
			return null;
		}
	}

	getToken() {
		return localStorage.getItem("access_token");
	}

	logout() {
		localStorage.clear();
		this.router.navigate(["/login"]);
	}
}
