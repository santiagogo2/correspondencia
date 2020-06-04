import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { DependenceService } from '../../../services/dependence.service';

@Component({
	selector: 'app-dependence-edit',
	templateUrl: './dependence-edit.component.html',
	styleUrls: ['./dependence-edit.component.css'],
	providers: [
		UserService,
		DependenceService
	]
})
export class DependenceEditComponent implements OnInit {
	public page_title: string;
	public status: string;
	public errorCode: number;
	public errorMessage: string;
	public responseMessage: string;
	public validationMessage: string;
	public preloaderStatus: boolean;
	public buttonText: string;

	public token: string;
	public identity: any;
	public dependence: any;

	constructor(
		private _userService: UserService,
		private _dependenceService: DependenceService,
		private _router: Router,
		private _route: ActivatedRoute
	) {
		this.buttonText = 'Editar Dependencia';
		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
	}

	ngOnInit() {
		this.getDependence();
	}

	getDependence(){
		this._route.params.subscribe(params => {
			this.status = undefined;
			this.errorCode = undefined;
			this.errorMessage = undefined;

			let id = +params['id'];

			this._dependenceService.getDependence(id).subscribe(
				response => {
					if(response.status == 'success'){
						this.dependence = response.dependence;
						this.page_title = 'Editar Dependencia ' + this.dependence.code;
					}
				},
				error => {
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

		this._dependenceService.updateDependence(this.token, this.dependence).subscribe(
			response => {
				this.preloaderStatus = false;

				if(response.status == 'success'){
					this.status = 'success';
					console.log(response);
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
