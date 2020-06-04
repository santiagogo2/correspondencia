import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { UserTypeService } from '../../../services/userType.service';

@Component({
	selector: 'app-user-clasification-list',
	templateUrl: './user-clasification-list.component.html',
	styleUrls: ['./user-clasification-list.component.css'],
	providers: [
		UserService,
		UserTypeService
	]
})
export class UserClasificationListComponent implements OnInit {
	public page_title: string;
	public status: string;
	public errorCode: number;
	public responseMessage: string;
	public errorMessage: string;
	public preloaderStatus: boolean;

	public token: string;
	public identity: any;
	public userClasification: any;

	constructor(
		private _userService: UserService,
		private _userTypeService: UserTypeService,
		private _router: Router
	) {
		this.page_title = 'Clasificación de usuarios del Sistema';

		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
	}

	ngOnInit() {
		this.userClasificationList();
	}

	userClasificationList(){
		this._userTypeService.list().subscribe(
			response => {
				if(response.status == 'success'){
					this.userClasification = response.usersClasification;
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

	deleteClasification(id){
		this.status = undefined;
		this.errorCode = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this._userTypeService.deleteUser(this.token, id).subscribe(
			response => {
				console.log(response);
				this.preloaderStatus = false;

				if(response.status = 'success'){
					this.status = 'success';
					this.responseMessage = response.message;
					this.userClasificationList();
				}
			}, 
			error => {
				this.preloaderStatus = false;
				this.status = 'error';
				this.errorCode = error.error.code;
				this.responseMessage = error.error.message;
				if(error.status && error.status == 500) this.errorCode = 500;
			}
		);
	}
}
