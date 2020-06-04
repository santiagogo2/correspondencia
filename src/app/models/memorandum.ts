export class Memorandum{
	constructor(
		public id: number,
		public app_users_id: number,
		public dependence_id: number,
		public documents_id: number,
		public document_date: string,
		public affair: string,
		public number_folios: number,
		public attached_id: number,
		public reference: string,
		public guide: string
	){}
}