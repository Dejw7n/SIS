import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardModule } from "./pages/dashboard/dashboard.module";
import { UsersModule } from "./pages/users/users.module";
import { IssuesModule } from "./pages/issues/issues.module";
import { ProfileModule } from "./pages/profile/profile.module";
import { ProjectsModule } from "./pages/projects/projects.module";

@NgModule({
	declarations: [],
	imports: [CommonModule, DashboardModule, UsersModule, IssuesModule, ProfileModule, ProjectsModule],
	exports: [],
})
export class StaffModule {}
