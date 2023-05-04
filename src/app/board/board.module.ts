import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BoardComponent } from "./board.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { BoardRoutingModule } from "./board-routing.module";

@NgModule({
	declarations: [BoardComponent, DashboardComponent],
	imports: [BoardRoutingModule, CommonModule],
	bootstrap: [BoardComponent],
})
export class BoardModule {}
