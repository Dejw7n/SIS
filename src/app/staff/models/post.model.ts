import { FileModel } from "./file.model";
import { UserModel } from "./user.model";

export interface PostModel {
	id: number;
	title: string;
	content: string;
	priority_id: number;
	center_id: number;
	user_id: number;
	date: Date;
	monitors: Boolean;
	user: UserModel;
	files: FileModel[];
	changes: any;
	created_at: Date;
	updated_at: Date;
}
