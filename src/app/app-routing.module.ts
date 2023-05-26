import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

//components
import { DashboardComponent } from "./staff/pages/dashboard/dashboard.component";
import { UsersComponent } from "./staff/pages/users/users.component";
import { NotFoundComponent } from "./core/components/errors/not-found/not-found.component";
import { LoginComponent } from "./auth/pages/login/login.component";
import { AuthGuard } from "./core/guards/auth/auth.guard";
import { IssuesComponent } from "./staff/pages/issues/issues.component";
import { ProfileComponent } from "./staff/pages/profile/profile.component";

const routes: Routes = [
	{ path: "login", component: LoginComponent },
	{ path: "", component: DashboardComponent, canActivate: [AuthGuard] },
	{ path: "users", component: UsersComponent, canActivate: [AuthGuard], data: { required_role: ["admin"] } },
	{ path: "issues", component: IssuesComponent, canActivate: [AuthGuard] },
	{ path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
	{ path: "**", component: NotFoundComponent, canActivate: [AuthGuard] },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
