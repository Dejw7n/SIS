import { Component, Self } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "src/app/auth/services/auth/auth.service";
import { UserService } from "src/app/staff/services/user/user.service";

@Component({
	selector: "app-change-password",
	templateUrl: "./change-password.component.html",
	styleUrls: ["./change-password.component.sass"],
})
export class ChangePasswordComponent {
	userData: any;
	constructor(private authService: AuthService, private userService: UserService, private snackBar: MatSnackBar, private dialogRef: MatDialogRef<Self>) {
		this.userData = this.authService.getSessionData();
	}

	form = {
		new_password: null,
		new_password_confirmation: null,
	};

	//form for api
	formApi = {
		password: "",
	};

	async send() {
		if (this.form.new_password != null && this.form.new_password_confirmation != null) {
			if (this.form.new_password == this.form.new_password_confirmation) {
				this.formApi.password = this.form.new_password;
				this.userService.editUser(this.userData.id, this.formApi).subscribe(
					(res) => {
						//this.close();
						//location.reload();
					},
					(err) => {
						console.log(err);
						this.snackBar.open("Nepodařilo se změnit heslo. Chyba: " + JSON.stringify(err.error), "X", { panelClass: ["error"] });
					}
				);
			} else {
				this.snackBar.open("Nové hesla se neshodují.", "X", { panelClass: ["error"] });
			}
		} else {
			this.snackBar.open("Nejsou vyplněny všechny povinné údaje.", "X", { panelClass: ["error"] });
		}
	}

	close(): void {
		this.dialogRef.close();
	}
}
