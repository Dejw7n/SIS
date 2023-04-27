import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AddUserComponent } from "./components/add-user/add-user.component";
import { EditUserComponent } from "./components/edit-user/edit-user.component";
import { FormsModule } from "@angular/forms";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzSelectModule } from "ng-zorro-antd/select";
import { MatDialogModule } from "@angular/material/dialog";
import { MatMenuModule } from "@angular/material/menu";
import { NzEmptyModule } from "ng-zorro-antd/empty";
import { NzDrawerModule } from "ng-zorro-antd/drawer";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { NzIconModule } from "ng-zorro-antd/icon";
import { EditorModule } from "@tinymce/tinymce-angular";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { UsersComponent } from "./users.component";
import { UserFilterPipe } from "../../pipes/user-filter/user-filter.pipe";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
	declarations: [UserFilterPipe, UsersComponent, AddUserComponent, EditUserComponent],
	imports: [CommonModule, SharedModule, FormsModule, NzFormModule, NzInputModule, NzSelectModule, MatDialogModule, MatMenuModule, NzEmptyModule, NzDrawerModule, NzDatePickerModule, NzIconModule, EditorModule, MatSnackBarModule],
})
export class UsersModule {}
