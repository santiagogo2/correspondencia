import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
	selector: 'app-user-edit-password',
	templateUrl: './user-edit-password.component.html',
	styleUrls: ['./user-edit-password.component.css'],
	providers: [UserService]
})
export class UserEditPasswordComponent implements OnInit {
	public page_title: string;
	public status: string;
	public errorCode: number;
	public responseMessage: string;
	public validationMessage: string;
	public preloaderStatus: boolean;
	public passwordConfirm: string;

	public token: string;
	public identity: any;
	public user: any;

	constructor(
		private _userService: UserService,
		private _route: ActivatedRoute
	) {
		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
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
						this.page_title = 'Actualizar la contrasela usuario ' + this.user.user_alias;
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

	updatePassword(){
		this.status = undefined;
		this.errorCode = undefined;
		this.responseMessage = undefined;
		this.validationMessage = undefined;
		this.preloaderStatus = true;

		this._userService.updatePassword(this.token, this.user).subscribe(
			response => {
				this.preloaderStatus = false;

				if(response.status == 'success'){
					this.status = 'success';
					this.responseMessage = response.message;
					this.user.password = undefined;
					this.passwordConfirm = undefined;
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
