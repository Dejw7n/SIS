import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardModule } from "./pages/dashboard/dashboard.module";
import { UsersModule } from "./pages/users/users.module";

@NgModule({
	declarations: [],
	imports: [CommonModule, DashboardModule, UsersModule],
	exports: [],
})
export class StaffModule {}
