import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AuthService } from "src/app/auth/services/auth/auth.service";
import { ChangePasswordComponent } from "src/app/core/components/overlay/Components/change-password/change-password.component";

@Component({
	selector: "app-profile",
	templateUrl: "./profile.component.html",
	styleUrls: ["./profile.component.sass"],
})
export class ProfileComponent {
	userData: any;
	constructor(private authService: AuthService, private dialog: MatDialog) {
		this.userData = this.authService.getUserData();
	}

	openChangePassword() {
		let dialogRef = this.dialog.open(ChangePasswordComponent, {
			height: "auto",
			width: "800px",
			panelClass: "custom-dialog-container",
		});
	}

	logout() {
		this.authService.logout();
	}
}
