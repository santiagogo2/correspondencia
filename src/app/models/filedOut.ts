export class FiledOut{
	constructor(
		public id: number,
		public app_users_id: number,
		public filed_in_id: number,
		public dependence_id: number,
		public documents_id: number,
		public document_date: string,
		public affair: string,
		public number_folios: number,
		public attached_id: number,
		public reference: string,
		public guide: string,
		public desName: string,
		public desSurname: string,
		public desEntity: string,
		public desAddress: string
	){}
}