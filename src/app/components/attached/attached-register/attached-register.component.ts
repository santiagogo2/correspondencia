import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { AttachedService } from '../../../services/attached.service';
import { Attached } from '../../../models/attached';

@Component({
	selector: 'app-attached-register',
	templateUrl: './attached-register.component.html',
	styleUrls: ['./attached-register.component.css'],
	providers: [
		UserService,
		AttachedService
	]
})
export class AttachedRegisterComponent implements OnInit {
	public page_title: string;
	public status: string;
	public errorCode: number;
	public responseMessage: string;
	public validationMessage: string;
	public buttonText: string;
	public preloaderStatus: boolean;

	public token: string;
	public identity: any;
	public attached: Attached;

	constructor(
		private _userService: UserService,
		private _attachedService: AttachedService,
		private _router: Router
	) {
		this.page_title = 'Agregar Tipo de Adjunto';
		this.buttonText = 'Agregar Tipo de Adjunto';

		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
		this.attached = new Attached(1, null);
	}

	ngOnInit() {}

	onSubmit(attachedForm){
		this.status = undefined;
		this.responseMessage = undefined;
		this.validationMessage = undefined;

		this._attachedService.newAttached(this.token, this.attached).subscribe(
			response => {
				if(response.status == 'success'){
					this.status = 'success';
					this.responseMessage = response.message;
					attachedForm.reset();
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
