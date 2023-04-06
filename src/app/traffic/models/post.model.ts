export interface PostModel {
	id: number;
	title: string;
	content: string;
	priority: number;
	center_id: number;
	user_id: number;
	date: Date;
	files: any;
}
