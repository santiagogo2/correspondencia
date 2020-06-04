import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { global } from '../../../services/global';

@Component({
	selector: 'app-user-edit',
	templateUrl: './user-edit.component.html',
	styleUrls: ['./user-edit.component.css'],
	providers: [UserService]
})
export class UserEditComponent implements OnInit {
	public page_title: string;
	public status: string;
	public errorCode: number;
	public responseMessage: string;
	public validationMessage: string;
	public preloaderStatus: boolean;

	public token: string;
	public identity: any;
	public user: any;
	public roles: any;

	constructor(
		private _userService: UserService,
		private _router: Router,
		private _route: ActivatedRoute
	) {
		this.preloaderStatus = false;

		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
		this.roles = global.roles;
	}

	ngOnInit() {
		this.getUser();
	}

	getUser(){
		this._route.params.subscribe(params => {
			this.status = undefined;
			this.errorCode = undefined;
			this.responseMessage = undefined;

			let id = +params['id'];

			this._userService.getUser(this.token, id).subscribe(
				response => {
					if(response.status == 'success'){
						this.user = response.user;
						this.page_title = 'Editar usuario ' + this.user.user_alias;
					}
				},
				error => {
					this.status = 'error';
					this.errorCode = error.error.code;
					this.responseMessage = error.error.message;
					if(error.status && error.status == 500) this.errorCode = 500;
					console.log(<any>error);
				}
			);
		});
	}

	updateUser(){
		this.status = undefined;
		this.errorCode = undefined;
		this.responseMessage = undefined;
		this.validationMessage = undefined;
		this.preloaderStatus = true;

		this._userService.updateUser(this.token, this.user).subscribe(
			response => {
				this.preloaderStatus = false;

				if(response.status == 'success'){
					this.status = 'success';
					this.responseMessage = response.message;
				}
			},
			error => {
				this.preloaderStatus = false;
				this.status = 'error';
				this.errorCode = error.error.code;
				this.responseMessage = error.error.message;
				if(error.status && error.status == 500) this.errorCode = 500;
				if(error.error.errors){
					this.validationMessage = JSON.stringify(error.error.errors);
				}
				console.log(<any>error);				
			}
		);
	}
}
