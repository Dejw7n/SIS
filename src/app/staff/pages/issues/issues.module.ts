import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IssuesComponent } from "./issues.component";
import { AddIssueComponent } from "./components/add-issue/add-issue.component";

import { NzSelectModule } from "ng-zorro-antd/select";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzEmptyModule } from "ng-zorro-antd/empty";
import { MatMenuModule } from "@angular/material/menu";
import { FormsModule } from "@angular/forms";
import { EditorModule } from "@tinymce/tinymce-angular";
import { MatDialogModule } from "@angular/material/dialog";
import { NzDrawerModule } from "ng-zorro-antd/drawer";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { NzIconModule } from "ng-zorro-antd/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import { FilesModule } from "src/app/core/components/files/files.module";

@NgModule({
	declarations: [IssuesComponent, AddIssueComponent],
	imports: [FilesModule, CommonModule, NzEmptyModule, NzDrawerModule, FormsModule, NzFormModule, NzInputModule, NzCheckboxModule, NzSelectModule, MatMenuModule, NzDatePickerModule, MatDialogModule, NzIconModule, EditorModule, MatSnackBarModule],
})
export class IssuesModule {}
