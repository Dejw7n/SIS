import { Pipe, PipeTransform } from "@angular/core";
import { IssueModel } from "src/app/staff/models/issue.model";

@Pipe({
	name: "issueFilter",
})
export class IssueFilterPipe implements PipeTransform {
	transform(items: IssueModel[], center: number, status: number): IssueModel[] {
		return items.filter((res) => {
			if (center === 0 && res.status_id === status) {
				return true;
			} else {
				return res.center_id === center && res.status_id === status;
			}
		});
	}
}
