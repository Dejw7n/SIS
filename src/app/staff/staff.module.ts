import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilesComponent } from "./pages/files/files.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { IssuesComponent } from "./pages/issues/issues.component";
import { AllUsersComponent } from "./pages/users/components/all-users/all-users.component";
import { UserFilterPipe } from "./pipes/user-filter/user-filter.pipe";
import { AddUserComponent } from "./pages/users/components/add-user/add-user.component";
import { EditUserComponent } from "./pages/users/components/edit-user/edit-user.component";
import { SharedModule } from "../shared/shared.module";
import { FilesModule } from "../core/components/files/files.module";
import { OverlayModule } from "@angular/cdk/overlay/overlay-module";
import { HomeModule } from "./pages/home/home.module";
import { NzEmptyModule } from "ng-zorro-antd/empty";
import { NzDrawerModule } from "ng-zorro-antd/drawer";
import { FormsModule } from "@angular/forms";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzSelectModule } from "ng-zorro-antd/select";
import { MatMenuModule } from "@angular/material/menu";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { MatDialogModule } from "@angular/material/dialog";
import { NzIconModule } from "ng-zorro-antd/icon";
import { EditorModule } from "@tinymce/tinymce-angular";
import { MatSnackBarModule } from "@angular/material/snack-bar";

@NgModule({
	declarations: [FilesComponent, LoginPageComponent, IssuesComponent, AllUsersComponent, UserFilterPipe, AddUserComponent, EditUserComponent],
	imports: [SharedModule, FilesModule, OverlayModule, HomeModule, CommonModule, NzEmptyModule, NzDrawerModule, FormsModule, NzFormModule, NzInputModule, NzSelectModule, MatMenuModule, NzDatePickerModule, MatDialogModule, NzIconModule, EditorModule, MatSnackBarModule],
	exports: [LoginPageComponent, UserFilterPipe, AllUsersComponent],
})
export class StaffModule {}
