import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { AttachedService } from '../../../services/attached.service';

@Component({
	selector: 'app-attached-list',
	templateUrl: './attached-list.component.html',
	styleUrls: ['./attached-list.component.css'],
	providers: [
		UserService,
		AttachedService
	]
})
export class AttachedListComponent implements OnInit {
	public page_title: string;
	public status: string;
	public errorCode: number;
	public errorMessage: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public actualPage: number;
	public itemsPerPage: number;

	public token: string;
	public identity: any;
	public attached: any;

	constructor(
		private _userService: UserService,
		private _attachedService: AttachedService,
		private _router: Router
	) {
		this.page_title = 'Tipo de Adjuntos del Sistema';
		this.actualPage = 1;
		this.itemsPerPage = 15;

		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
	}

	ngOnInit() {
		this.attachedList();
	}

	attachedList(){
		this._attachedService.list().subscribe(
			response => {
				if(response.status == 'success'){
					this.attached = response.attached;
				}
			},
			error => {
				this.status = 'error';
				this.errorCode = error.error.code;
				this.errorMessage = error.error.message;
				if(error.status && error.status == 500) this.errorCode = 500;
				console.log(<any>error);
			}
		);
	}

	deleteAttached(id){
		this.status = undefined;
		this.errorCode = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this._attachedService.deleteAttached(this.token, id).subscribe(
			response => {
				this.preloaderStatus = false;
				if (response.status == 'success') {
					this.status = 'success';
					this.responseMessage = response.message;
					this.attachedList();
				}
			},
			error => {
				this.preloaderStatus = false;
				this.status = 'error';
				this.errorCode = error.error.code;
				this.responseMessage = error.error.message;
				if(error.status && error.status == 500) this.errorCode = 500;
				console.log(<any>error);
			}
		);
	}

	pageChange(event){
		this.actualPage = event;
	}
}
