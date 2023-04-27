import { Component, OnInit, Self } from "@angular/core";
import { FormControl, FormGroupDirective, NgForm, Validators } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { CenterModel } from "src/app/staff/models/center.model";
import { RoleModel } from "src/app/staff/models/role.model";
import { UserService } from "src/app/staff/services/user/user.service";
import { PostService } from "src/app/staff/services/post/post.service";
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
	selector: "app-edit-user",
	templateUrl: "./edit-user.component.html",
	styleUrls: ["./edit-user.component.sass"],
})
export class EditUserComponent implements OnInit {
	userId!: number;
	userData!: any;

	emailFormControl = new FormControl("", [Validators.required, Validators.email]);

	matcher = new MyErrorStateMatcher();

	centers: CenterModel[] = [];
	roles: RoleModel[] = [];
	Form = {
		name: null,
		lname: null,
		phone: null,
		email: null,
		role_id: null,
		center_id: null,
		password: null,
	};

	constructor(private roleService: RoleService, private centerService: CenterService, private postService: PostService, private userService: UserService, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<Self>) {}

	ngOnInit(): void {
		this.userService.getUser(this.userId).subscribe((res) => {
			this.userData = res;
			this.Form = {
				name: this.userData.name,
				lname: this.userData.lname,
				phone: this.userData.phone,
				email: this.userData.email,
				role_id: this.userData.role_id,
				center_id: this.userData.center_id,
				password: null,
			};
		});
		this.centerService.getAllCenters().subscribe((res) => {
			this.centers = res;
		});
		this.roleService.getAllRoles().subscribe((res) => {
			this.roles = res;
		});
	}

	send() {
		if (this.Form.name != null && this.Form.lname != null && this.Form.phone != null && this.Form.email != null && this.Form.role_id != null && this.Form.center_id != null) {
			this.userService.editUser(this.userId, this.Form);
			// this.close();
			// location.reload();
		} else {
			this.snackBar.open("Nejsou vyplněny všechny povinné údaje.", "X", { panelClass: ["error"] });
		}
	}

	close(): void {
		this.dialogRef.close();
	}
}
