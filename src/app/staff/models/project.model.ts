import { UserModel } from "./user.model";

export interface ProjectModel {
	id: number;
	title: string;
	short_description: string;
	description: string;
	author_id: number;
	author: UserModel;
	created_at: Date;
	updated_at: Date;
}
