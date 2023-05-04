import { NgModule } from "@angular/core";
import { NoPreloading, RouterModule, Routes } from "@angular/router";

//components
import { NotFoundComponent } from "./core/components/errors/not-found/not-found.component";
import { AuthGuard } from "./core/guards/auth/auth.guard";
import { StaffComponent } from "./staff/staff.component";
import { AuthComponent } from "./auth/auth.component";

const routes: Routes = [
	{
		path: "",
		component: StaffComponent,
		canActivate: [AuthGuard],
		loadChildren: () => import("./staff/staff.module").then((m) => m.StaffModule),
	},

	{
		path: "auth",
		component: AuthComponent,
		loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
	},
	{ path: "**", component: NotFoundComponent, canActivate: [AuthGuard] },
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			preloadingStrategy: NoPreloading,
		}),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
