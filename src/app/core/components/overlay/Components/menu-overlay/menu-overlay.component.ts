import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/core/services/auth/auth.service";

@Component({
	selector: "app-menu-overlay",
	templateUrl: "./menu-overlay.component.html",
	styleUrls: ["./menu-overlay.component.sass"],
})
export class MenuOverlayComponent implements OnInit {
	constructor(private router: Router, private authService: AuthService) {}
	userRole: number = 0;

	menuItems: any[] = [
		{
			label: "Příspěvky",
			href: "/",
			iconType: "appstore",
			requiredRole: 3,
		},
		{
			label: "Uživatelé",
			href: "/users",
			iconType: "team",
			requiredRole: 1,
		},
		// {
		// 	label: "Závady",
		// 	href: "/issues",
		// 	iconType: "tool",
		// 	requiredRole: 0,
		// },
		// {
		// 	label: "Soubory",
		// 	href: "/files",
		// 	iconType: "file",
		// 	requiredRole: 0,
		// },
	];
	menuLogout: any = {
		label: "Odhlásit se",
		href: "#",
		iconType: "logout",
		requiredRole: 0,
	};

	logout() {
		localStorage.clear();
		this.router.navigate(["/login"]);
	}

	ngOnInit(): void {
		this.userRole = this.authService.getUserData().role_id;
		console.log(this.userRole);
	}
}
