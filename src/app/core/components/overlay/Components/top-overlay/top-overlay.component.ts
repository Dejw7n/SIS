import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AuthService } from "src/app/auth/services/auth/auth.service";
import { ChangePasswordComponent } from "../change-password/change-password.component";

@Component({
	selector: "app-top-overlay",
	templateUrl: "./top-overlay.component.html",
	styleUrls: ["./top-overlay.component.sass"],
})
export class TopOverlayComponent implements OnInit {
	userRole: string = "";

	date: Date = new Date();
	dateFormatted: string = "";
	evenOddWeek: string = "";
	userData = {
		name: "",
		lname: "",
	};
	constructor(private authService: AuthService, private dialog: MatDialog) {
		const userData = this.authService.getSessionData();
		this.userRole = userData.role;

		let days = ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"];
		this.dateFormatted = `${days[this.date.getDay()]}, ${this.date.getDate()}. ${this.date.getMonth() + 1}. ${this.date.getFullYear()}`;
		let evenOddWeekNumber = this.getWeekNumber(this.date) % 2;
		if (evenOddWeekNumber == 0) {
			this.evenOddWeek = "Sudý týden";
		} else {
			this.evenOddWeek = "Lichý týden";
		}
	}

	logout() {
		this.authService.logout();
	}

	openChangePassword() {
		let dialogRef = this.dialog.open(ChangePasswordComponent, {
			height: "auto",
			width: "800px",
			panelClass: "custom-dialog-container",
		});
	}

	getWeekNumber(thisDate: Date) {
		let startDate: Date = new Date(thisDate.getFullYear(), 0, 1);
		let test = thisDate.getTime() - startDate.getTime();
		var days = Math.floor(test / (24 * 60 * 60 * 1000));
		var weekNumber = Math.ceil(days / 7);
		return weekNumber;
	}

	ngOnInit(): void {
		this.changeName();
	}

	changeName() {
		this.userData.name = this.authService.getSessionData().name;
		this.userData.lname = this.authService.getSessionData().lname;
		window.removeEventListener("storage", this.changeName, false);
	}
}
