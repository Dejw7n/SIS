import { Component, OnInit, Self } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ProjectService } from "../../services/project.service";

@Component({
	selector: "app-edit-post",
	templateUrl: "./edit-project.component.html",
	styleUrls: ["./edit-project.component.sass"],
})
export class EditProjectComponent implements OnInit {
	projectId!: number;
	Form: any = {
		title: null,
		short_description: null,
		description: null,
	};

	constructor(private projectService: ProjectService, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<Self>) {}

	ngOnInit(): void {
		this.projectService.getOneProject(this.projectId).subscribe((res) => {
			this.Form = {
				title: res.title,
				short_description: res.short_description,
				description: res.description,
			};
		});
	}

	send(): void {
		if (this.Form.title != null && this.Form.short_description != null && this.Form.description != null) {
			this.projectService.update(this.projectId, this.Form).subscribe(
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
