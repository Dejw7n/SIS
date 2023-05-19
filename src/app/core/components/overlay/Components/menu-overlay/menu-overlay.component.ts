import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { AuthService } from "src/app/auth/services/auth/auth.service";

@Component({
	selector: "app-menu-overlay",
	templateUrl: "./menu-overlay.component.html",
	styleUrls: ["./menu-overlay.component.sass"],
})
export class MenuOverlayComponent implements OnInit {
	@Output() myFunctionCall = new EventEmitter();

	constructor(private authService: AuthService) {}
	userRole: number = 0;

	menuItems: any[] = [
		{
			label: "Příspěvky",
			href: "/",
			iconType: "appstore",
			requiredRole: ["teacher", "admin"],
		},
		{
			label: "Uživatelé",
			href: "/users",
			iconType: "team",
			requiredRole: ["admin"],
		},
		//{
		//	label: "Závady",
		//	href: "/issues",
		//	iconType: "warning",
		//	requiredRole: ["admin"],
		//},
	];
	menuLogout: any = {
		label: "Odhlásit se",
		href: "/logout",
		iconType: "logout",
		requiredRole: 0,
	};

	logout() {
		this.authService.logout();
	}

	ngOnInit(): void {
		this.userRole = this.authService.getUserData().role;
	}
}
