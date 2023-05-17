import { Component, OnInit } from '@angular/core';
import { AddIssueComponent } from './components/add-issue/add-issue.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/services/auth/auth.service';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.sass']
})

export class IssuesComponent implements OnInit {
  userCenterId: number = 0;
	userRole: string = "";
  constructor(public dialog: MatDialog, private authService: AuthService ) {
    const userData = this.authService.getUserData();
		this.userCenterId = userData.center_id;
		this.userRole = userData.role;
   }
  
	center: number = 0;
  ngOnInit(): void {
  }


  openIssue() {
		let dialogRef = this.dialog.open(AddIssueComponent, {
			height: "auto",
			width: "800px",
			panelClass: "custom-dialog-container",
		});
	}

  updateCenter(center: number, event: any) {
		let el = document.querySelectorAll("div[data-filter-selected]")[0];
		el.children[0].classList.replace("text-white", "text-gray-500");
		el.classList.remove("rounded-3xl");
		el.classList.remove("bg-red-600");
		el.removeAttribute("data-filter-selected");

		let element = event.currentTarget;
		element.children[0].classList.replace("text-gray-500", "text-white");
		element.classList.add("rounded-3xl");
		element.classList.add("bg-red-600");
		element.setAttribute("data-filter-selected", true);

		this.center = center;
	}

}


