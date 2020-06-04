import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { UserTypeService } from '../../../services/userType.service';

@Component({
	selector: 'app-user-clasification-edit',
	templateUrl: './user-clasification-edit.component.html',
	styleUrls: ['./user-clasification-edit.component.css'],
	providers: [
		UserService,
		UserTypeService
	]
})
export class UserClasificationEditComponent implements OnInit {
	public page_title: string;
	public status: string;
	public errorCode: number;
	public errorMessage: string;
	public responseMessage: string;
	public validationMessage: string;
	public buttonText: string;
	public preloaderStatus: boolean;

	public token: string;
	public identity: any;
	public userClasification: any;

	constructor(
		private _userService: UserService,
		private _userTypeService: UserTypeService,
		private _router: Router,
		private _route: ActivatedRoute
	) {
		this.buttonText = 'Editar Clasificación';

		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
	}

	ngOnInit() {
		this.getUserClasification();
	}

	getUserClasification(){
		this._route.params.subscribe(params => {
			this.status = undefined;
			this.errorCode = undefined;
			this.errorMessage = undefined;

			let id = +params['id'];

			this._userTypeService.getUserType(id).subscribe(
				response => {
					if(response.status == 'success'){
						this.userClasification = response.userClasification;
					}
				},
				error =>{
					this.status = 'error';
					this.errorCode = error.error.code;
					this.errorMessage = error.error.message;
					if(error.status && error.status == 500) this.errorCode = 500;
				}
			);
		});
	}

	onSubmit(){
		this.status = undefined;
		this.errorCode = undefined;
		this.responseMessage = undefined;
		this.validationMessage = undefined;
		this.preloaderStatus = true;

		this._userTypeService.updateUserType(this.token, this.userClasification).subscribe(
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
			}
		);
	}

}
