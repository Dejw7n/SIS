import { Pipe, PipeTransform } from "@angular/core";
import { CenterModel } from "src/app/staff/models/center.model";

@Pipe({
	name: "centerFilter",
})
export class CenterFilterPipe implements PipeTransform {
	transform(items: CenterModel[]): CenterModel[] {
		return items.filter((item) => {
			if (item.id !== 3) {
				return true;
			} else {
				return false;
			}
		});
	}
}
