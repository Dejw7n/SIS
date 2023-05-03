import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./pages/login/login.component";
import { FormsModule } from "@angular/forms";
import { AuthComponent } from "./auth.component";
import { AuthRoutingModule } from "./auth-routing.module";

@NgModule({
	declarations: [AuthComponent, LoginComponent],
	imports: [AuthRoutingModule, CommonModule, FormsModule],
	exports: [LoginComponent],
})
export class AuthModule {}
