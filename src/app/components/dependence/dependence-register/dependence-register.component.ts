import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { DependenceService } from '../../../services/dependence.service';
import { Dependences } from '../../../models/dependences';

@Component({
	selector: 'app-dependence-register',
	templateUrl: './dependence-register.component.html',
	styleUrls: ['./dependence-register.component.css'],
	providers: [
		UserService,
		DependenceService
	]
})
export class DependenceRegisterComponent implements OnInit {
	public page_title: string;
	public status: string;
	public errorCode: number;
	public responseMessage: string;
	public validationMessage: string;
	public buttonText: string;
	public preloaderStatus: boolean;

	public token: string;
	public identity: any;
	public dependence: Dependences;

	constructor(
		private _userService: UserService,
		private _dependenceService: DependenceService,
		private _router: Router
	) {
		this.page_title = 'Agregar Dependencias';
		this.buttonText = 'Crear Dependencia';

		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
		this.dependence = new Dependences(1,null,null,null);
	}

	ngOnInit() {}

	onSubmit(dependenceForm){
		this.status = undefined;
		this.errorCode = undefined;
		this.responseMessage = undefined;
		this.validationMessage = undefined;
		this.preloaderStatus = true;
		this.dependence.name = this.dependence.name.toUpperCase();

		this._dependenceService.newDependece(this.token, this.dependence).subscribe(
			response => {
				this.preloaderStatus = false;

				if(response.status == 'success'){
					this.status = 'success';
					this.responseMessage = response.message;
					dependenceForm.reset();
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
