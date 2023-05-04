import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { UsersComponent } from "./pages/users/users.component";

const routes: Routes = [
	{ path: "", component: DashboardComponent },
	{ path: "users", component: UsersComponent, data: { required_role: ["admin"] } },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class StaffRoutingModule {}
