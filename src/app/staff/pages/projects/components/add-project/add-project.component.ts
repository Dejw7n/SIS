import { Component, Self } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ProjectService } from "../../services/project.service";

class DialogData {}

@Component({
	selector: "app-add-post",
	templateUrl: "./add-project.component.html",
	styleUrls: ["./add-project.component.sass"],
})
export class AddProjectComponent {
	Form: any = {
		title: null,
		short_description: null,
		description: null,
	};

	constructor(private projectService: ProjectService, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<Self>) {}

	send(): void {
		if (this.Form.title != null && this.Form.short_description != null && this.Form.description != null) {
			this.projectService.create(this.Form).subscribe(
				(res) => {
					this.dialogRef.close();
					location.reload();
				},
				(err) => {
					this.snackBar.open("Chyba při odesílání formuláře.", "X", { panelClass: ["error"] });
				}
			);
		} else {
			this.snackBar.open("Nejsou vyplněny všechny povinné údaje.", "X", { panelClass: ["error"] });
		}
	}
}
