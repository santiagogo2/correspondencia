import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
	public page_title: string;
	public status: string;
	public errorCode: number;
	public responseMessage: string;
	public errorMessage: string;
	public actualPage: number;
	public itemsPerPage: number;
	public preloaderStatus: boolean;

	public token: string;
	public identity: any;
	public users: any;

	constructor(
		private _userService: UserService
	) {
		this.page_title = 'Usuarios registrados';
		this.actualPage = 1;
		this.itemsPerPage = 15;

		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
	}

	ngOnInit() {
		this.userList();
	}

	userList(){
		this._userService.userList(this.token).subscribe(
			response => {
				if(response.status == 'success'){
					this.users = response.users;
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

	deleteUser(id){
		this.status = undefined;
		this.errorCode = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this._userService.deleteUser(this.token, id).subscribe(
			response => {
				this.preloaderStatus = false;

				if(response.status == 'success'){
					this.status = 'success';
					this.responseMessage = response.message;
					this.userList();
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
