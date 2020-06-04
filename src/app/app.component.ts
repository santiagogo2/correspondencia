import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [UserService]
})

export class AppComponent implements OnInit, DoCheck{
	title = 'correspondencia';

	public token: string;
	public identity: any;

	constructor(
		private _userService: UserService,
		private _router: Router
	){}

	ngOnInit(): void{
		this.loadUser();
	}

	ngDoCheck(): void{
		this.loadUser();
	}

	loadUser(){
		let actualDate = new Date().getTime();
		let expiresDate = +localStorage.getItem('correspondenceExpiration');

		if(expiresDate && actualDate >= expiresDate){
			localStorage.clear();

			this.token = null;
			this.identity = null;

			this._router.navigate(['user/login']);
		} else {
			this.token = this._userService.getToken();
			this.identity = this._userService.getIdentity();
		}
	}
}
