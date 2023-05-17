import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssuesComponent } from './issues/issues.component';
import { AddIssueComponent } from './components/add-issue/add-issue.component';



@NgModule({
  declarations: [
    IssuesComponent,
    AddIssueComponent
  ],
  imports: [
    CommonModule
  ]
})
export class IssuesModule { }
