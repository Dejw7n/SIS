import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TopOverlayComponent } from "./Components/top-overlay/top-overlay.component";
import { MenuOverlayComponent } from "./Components/menu-overlay/menu-overlay.component";
import { AppRoutingModule } from "../../../app-routing.module";
import { NzAvatarModule } from "ng-zorro-antd/avatar";
import { NzIconModule } from "ng-zorro-antd/icon";
import { FormsModule } from "@angular/forms";
import { MatMenuModule } from "@angular/material/menu";
import { ChangePasswordComponent } from "./Components/change-password/change-password.component";
import { NzFormModule } from "ng-zorro-antd/form";
import { MatDialogModule } from "@angular/material/dialog";
import { NzInputModule } from "ng-zorro-antd/input";

@NgModule({
	declarations: [TopOverlayComponent, MenuOverlayComponent, ChangePasswordComponent],
	imports: [CommonModule, AppRoutingModule, NzAvatarModule, NzInputModule, NzFormModule, MatDialogModule, NzIconModule, FormsModule, MatMenuModule],
	exports: [TopOverlayComponent, MenuOverlayComponent],
})
export class OverlayModule {}
