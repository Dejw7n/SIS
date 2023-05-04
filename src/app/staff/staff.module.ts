import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardModule } from "./pages/dashboard/dashboard.module";
import { UsersModule } from "./pages/users/users.module";
import { StaffRoutingModule } from "./staff-routing.module";
import { StaffComponent } from "./staff.component";

@NgModule({
	declarations: [StaffComponent],
	imports: [StaffRoutingModule, CommonModule, DashboardModule, UsersModule],
	bootstrap: [StaffComponent],
})
export class StaffModule {}
