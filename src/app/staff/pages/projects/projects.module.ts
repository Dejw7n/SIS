import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProjectsComponent } from "./projects.component";
import { SharedModule } from "src/app/shared/shared.module";
import { AddProjectComponent } from "./components/add-project/add-project.component";
import { EditProjectComponent } from "./components/edit-project/edit-project.component";
import { NzEmptyModule } from "ng-zorro-antd/empty";
import { MatMenuModule } from "@angular/material/menu";
import { MatDialogModule } from "@angular/material/dialog";
import { NzFormModule } from "ng-zorro-antd/form";
import { EditorModule } from "@tinymce/tinymce-angular";
import { FormsModule } from "@angular/forms";

@NgModule({
	declarations: [ProjectsComponent, AddProjectComponent, EditProjectComponent],
	imports: [CommonModule, SharedModule, NzEmptyModule, MatMenuModule, MatDialogModule, NzFormModule, EditorModule, FormsModule],
})
export class ProjectsModule {}
