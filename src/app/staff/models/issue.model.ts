import { UserModel } from "./user.model";

export interface IssueModel {
	id: number;
	title: string;
	description: string;
	priority_id: number;
	status_id: number;
	center_id: number;
	author_id: number;
	author: UserModel;
	created_at: Date;
	updated_at: Date;
}
