export class User{
	constructor(
		public id: number,
		public user_alias: string,
		public password: string,
		public name: string,
		public surname: string,
		public role: string
	){}
}