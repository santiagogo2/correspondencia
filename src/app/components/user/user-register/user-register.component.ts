import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { global } from '../../../services/global';
import { User } from '../../../models/user';

@Component({
	selector: 'app-user-register',
	templateUrl: './user-register.component.html',
	styleUrls: ['./user-register.component.css'],
	providers: [UserService]
})
export class UserRegisterComponent implements OnInit {
	public page_title: string;
	public status: string;
	public errorCode: number;
	public responseMessage: string;
	public validationMessage: string;
	public preloaderStatus: boolean;
	public passwordConfirm;

	public token: string;
	public identity: any;
	public user: User;
	public roles: any;

	constructor(
		private _userService: UserService,
		private _router: Router
	) {
		this.page_title = 'Agregar un nuevo usuario';

		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
		this.user = new User(1,null,null,null,null,null);
		this.roles = global.roles;
	}

	ngOnInit() {
		if(this.identity && this.identity.role != 'admin'){
			this._router.navigate(['/radicado/salida']);
		}
	}

	onSubmit(userRegisterForm){
		this.status = undefined;
		this.errorCode = undefined;
		this.responseMessage = undefined;
		this.validationMessage = undefined;
		this.preloaderStatus = true;

		this._userService.newUser(this.token, this.user).subscribe(
			response => {
				this.preloaderStatus = false;

				if(response.status == 'success'){
					this.status = 'success';
					this.responseMessage = response.message;
					userRegisterForm.reset();
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
