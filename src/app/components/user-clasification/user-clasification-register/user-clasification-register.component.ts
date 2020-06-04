import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { UserTypeService } from '../../../services/userType.service';
import { UserType } from '../../../models/userType';

@Component({
	selector: 'app-user-clasification-register',
	templateUrl: './user-clasification-register.component.html',
	styleUrls: ['./user-clasification-register.component.css'],
	providers: [
		UserService,
		UserTypeService
	]
})
export class UserClasificationRegisterComponent implements OnInit {
	public page_title: string;
	public status: string;
	public errorCode: number;
	public responseMessage: string;
	public validationMessage: string;
	public buttonText: string;
	public preloaderStatus: boolean;

	public token: string;
	public identity: any;
	public userClasification: UserType;

	constructor(
		private _userService: UserService,
		private _userTypeService: UserTypeService,
		private _router: Router
	) {
		this.page_title = 'Agregar Clasificación de usuario';
		this.buttonText = 'Agregar Clasificación';

		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
		this.userClasification = new UserType(1, null);
	}

	ngOnInit() {}

	onSubmit(userClasificationForm){
		this.status = undefined;
		this.errorCode = undefined;
		this.responseMessage = undefined;
		this.validationMessage = undefined;
		this.preloaderStatus = true;

		this._userTypeService.newUserType(this.token, this.userClasification).subscribe(
			response => {
				this.preloaderStatus = false;

				if(response.status == 'success'){
					this.status = 'success';
					this.responseMessage = response.message;
					userClasificationForm.reset();
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
			}
		);
	}
}
