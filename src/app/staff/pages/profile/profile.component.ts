import { DatePipe } from "@angular/common";
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
	formattedDate: any;
	userData: any;
	constructor(private datePipe: DatePipe, private authService: AuthService, private dialog: MatDialog) {
		this.userData = this.authService.getSessionData();

		this.formattedDate = this.datePipe.transform(this.userData.created_at, "yyyy-MM-dd HH:mm:ss");
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
