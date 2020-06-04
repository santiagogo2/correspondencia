export class AppUsers{
	constructor(
		public id: number,
		public user_clasification_id: number,
		public name: string,
		public surname: string,
		public second_surname: string,
		public phone: string,
		public address: string,
		public email: string,
		public company: string,
		public country_id: number,
		public department_id: number,
		public municipality_id: number
	){}
}