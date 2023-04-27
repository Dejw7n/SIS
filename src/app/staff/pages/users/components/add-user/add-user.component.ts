import { Component, OnInit, Self } from "@angular/core";
import { CenterModel } from "src/app/staff/models/center.model";
import { RoleModel } from "src/app/staff/models/role.model";
import { PostService } from "src/app/staff/services/post/post.service";
import { FormControl, FormGroupDirective, NgForm, Validators } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatNativeDateModule } from "@angular/material/core";
import { HttpClientModule } from "@angular/common/http";
import { UserService } from "src/app/staff/services/user/user.service";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CenterService } from "src/app/staff/services/center/center.service";
import { RoleService } from "src/app/staff/services/role/role.service";

export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const isSubmitted = form && form.submitted;
		return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
	}
}

@Component({
	selector: "app-add-user",
	templateUrl: "./add-user.component.html",
	styleUrls: ["./add-user.component.sass"],
})
export class AddUserComponent implements OnInit {
	emailFormControl = new FormControl("", [Validators.required, Validators.email]);

	matcher = new MyErrorStateMatcher();

	centers: CenterModel[] = [];
	roles: RoleModel[] = [];
	Form = {
		name: null,
		lname: null,
		phone: null,
		email: null,
		role_id: 3,
		center_id: null,
		password: null,
	};

	constructor(private roleService: RoleService, private centerService: CenterService, private userService: UserService, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<Self>) {}

	ngOnInit(): void {
		this.centerService.getAllCenters().subscribe((res) => {
			this.centers = res;
		});
		this.roleService.getAllRoles().subscribe((res) => {
			this.roles = res;
		});
	}

	async send() {
		if (this.Form.name != null && this.Form.lname != null && this.Form.email != null && this.Form.role_id != null && this.Form.center_id != null && this.Form.password) {
			this.userService.createUser(this.Form).subscribe(
				(res) => {
					this.close();
					location.reload();
				},
				(err) => {
					console.log(err);
					this.snackBar.open("Nepodařilo se vytvořit uživatele. Chyba: " + JSON.stringify(err.error), "X", { panelClass: ["error"] });
				}
			);
		} else {
			this.snackBar.open("Nejsou vyplněny všechny povinné údaje.", "X", { panelClass: ["error"] });
		}
	}

	close(): void {
		this.dialogRef.close();
	}
}
