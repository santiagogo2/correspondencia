import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { AttachedService } from '../../../services/attached.service';

@Component({
	selector: 'app-attached-edit',
	templateUrl: './attached-edit.component.html',
	styleUrls: ['./attached-edit.component.css'],
	providers: [
		UserService,
		AttachedService
	]
})
export class AttachedEditComponent implements OnInit {
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
	public attached: any;

	constructor(
		private _userService: UserService,
		private _attachedService: AttachedService,
		private _router: Router,
		private _route: ActivatedRoute
	) {
		this.buttonText = 'Editar Tipo de Adjunto';

		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
	}

	ngOnInit() {
		this.getAttached();
	}

	getAttached(){
		this._route.params.subscribe(params => {
			this.status = undefined;
			this.errorCode = undefined;
			this.errorMessage = undefined;

			let id = +params['id'];

			this._attachedService.getAttached(id).subscribe(
				response => {
					if(response.status == 'success'){
						this.attached = response.attached;
						this.page_title = 'Editar Tipo de Adjunto ' + this.attached.name;
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

		this._attachedService.updateAttached(this.token, this.attached).subscribe(
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
