import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { DependenceService } from '../../../services/dependence.service';

@Component({
	selector: 'app-dependence-list',
	templateUrl: './dependence-list.component.html',
	styleUrls: ['./dependence-list.component.css'],
	providers: [
		UserService,
		DependenceService
	]
})
export class DependenceListComponent implements OnInit {
	public page_title: string;
	public status: string;
	public errorCode: number;
	public responseMessage: string;
	public errorMessage: string;
	public preloaderStatus: boolean;
	public actualPage: number;
	public itemsPerPage: number;

	public token: string;
	public indentity: any;
	public dependences: any;

	constructor(
		private _userService: UserService,
		private _dependenceService: DependenceService,
		private _router: Router
	) {
		this.page_title = 'Dependencias del sistema';
		this.actualPage = 1;
		this.itemsPerPage = 15;

		this.token = this._userService.getToken();
		this.indentity = this._userService.getIdentity();
	}

	ngOnInit() {
		this.dependenceList();
	}

	dependenceList(){
		this._dependenceService.list().subscribe(
			response => {
				if(response.status == 'success'){
					this.dependences = response.dependences;
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

	deleteDependence(id){
		this.status = undefined;
		this.errorCode = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this._dependenceService.deleteDependence(this.token, id).subscribe(
			response => {
				this.preloaderStatus = false;

				if(response.status == 'success'){
					this.status = 'success';
					this.responseMessage = response.message;
					this.dependenceList();
				}
			},
			error => {
				this.preloaderStatus = false;
				this.status = 'error';
				this.errorCode = error.error.code;
				this.errorMessage = error.error.message;
				if(error.status && error.status == 500) this.errorCode = 500;
				console.log(<any>error);
			}
		);
	}

	pageChange(event){
		this.actualPage = event;
	}
}
