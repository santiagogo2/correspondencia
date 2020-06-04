import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AppUsersService } from '../../../services/appUsers.service';
import { UserTypeService } from '../../../services/userType.service';
import { CountryService } from '../../../services/country.service';
import { DepartmentService } from '../../../services/department.service';
import { MunicipalityService } from '../../../services/municipality.service';
import { UserService } from '../../../services/user.service';
import { AppUsers } from '../../../models/appUsers'; 

@Component({
	selector: 'app-app-users-register',
	templateUrl: './app-users-register.component.html',
	styleUrls: ['./app-users-register.component.css'],
	providers: [
		AppUsersService,
		UserTypeService,
		CountryService,
		DepartmentService,
		MunicipalityService,
		UserService
	]
})
export class AppUsersRegisterComponent implements OnInit {
	public status: string;
	public searchStatus: string;
	public addStatus: string;
	public errorCode: number;
	public errorMessage: string;
	public searchErrorMessage: string;
	public addMessage: string;
	public page_title: string;
	public page_title2: string;
	public page_title3: string;
	public newAppUsers: any;
	public preLoader: number;
	public preloaderStatus: boolean;
	public preLoader2: number;
	public itemsPerPage: number;
	public actualPage: number;

	public typeSearch: number;
	public clasificationSearch: number;
	public parameterValue: number;
	public userClasification: any[];
	public appUsers: any;
	public countries: any[];
	public departments: any;
	public municipalities: any;
	public token: string;
	public identity: any;

	constructor(
		private _appUsersService: AppUsersService,
		private _userTypeService: UserTypeService,
		private _countryService: CountryService,
		private _departmentService: DepartmentService,
		private _municipalityService: MunicipalityService,
		private _userService: UserService,
		private _router: Router
	) {
		this.itemsPerPage = 10;
		this.actualPage = 1;
		
		this.page_title = 'Usuarios';
		this.page_title2 = 'Resultados de la Busqueda';
		this.page_title3 = 'Agregar un Nuevo Usuario';
		this.newAppUsers = new AppUsers(null,null,null,null,null,null, null,null,null,null,null,null);

		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
	}

	ngOnInit() {
		this.userTypeList();
		this.countryList();
	}

	appUsersList(){
		this._appUsersService.list().subscribe(
			response => {
				console.log(response);
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

	getAppUsersById(id){
		this.appUsers = null;
		this.searchStatus = null;
		this.errorCode = null;
		this.searchErrorMessage = null;

		this._appUsersService.getAppUsers(id).subscribe(
			response => {
				this.preLoader = 2;
				if(response.status == 'success'){
					this.appUsers = response.appUser;
					if(this.appUsers == ''){
						this.appUsers = null;
						this.searchStatus = 'error';
						this.searchErrorMessage = 'No se ha encontrado ningún usuario con el id: '+id;
					}
				}
			},
			error => {
				this.preLoader = 2;
				this.searchStatus = 'error';
				this.errorCode = error.error.code;
				this.searchErrorMessage = error.error.message;
				if(error.status && error.status == 500) this.errorCode = 500;
				console.log(<any>error);
			}
		);
	}

	getAppUsersByTextAndClasification(text, clasification){
		this.appUsers = null;
		this.searchStatus = null;
		this.errorCode = null;
		this.searchErrorMessage = null;

		this._appUsersService.getAppUsersByTextAndClasification(text, clasification).subscribe(
			response => {
				this.preLoader = 2;
				if(response.status == 'success'){
					this.appUsers = response.appUsers;
					if(this.appUsers == ''){
						this.appUsers = null;
						this.searchStatus = 'error';
						this.searchErrorMessage = 'No se ha encontrado ningún usuario con los parámetros de buqueda ingresados';
					}
				}
			},
			error => {
				this.preLoader = 2;
				this.searchStatus = 'error';
				this.errorCode = error.error.code;
				this.searchErrorMessage = error.error.message;
				if(error.status && error.status == 500) this.errorCode = 500;
				console.log(<any>error);
			}
		);
	}

	userTypeList(){
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

	countryList(){
		this._countryService.list().subscribe(
			response => {
				if(response.status == 'success'){
					this.countries = response.countries;				
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

	departmentFind(){
		this.departments = null;
		let country_id = this.newAppUsers.country_id;

		if(country_id != null && country_id != undefined){
			this._departmentService.getDepartmentByCountryId(country_id).subscribe(
				response => {
					if(response.status == 'success'){
						this.departments = response.departments;
						if(this.departments == '') this.departments = null;
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
	}

	municipalityFind(){
		this.municipalities = null;
		let department_id = this.newAppUsers.department_id;

		if(department_id != null && department_id != undefined){
			this._municipalityService.getMunicipalityByDepartmentId(department_id).subscribe(
				response => {
					if(response.status == 'success'){
						this.municipalities = response.municipalities;
						if(this.municipalities == '') this.municipalities = null;
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
	}

	onSubmitSearch(form){
		this.preLoader = 1;
		if(this.typeSearch == 1){
			this.newAppUsers.id = this.parameterValue;
			this.getAppUsersById(this.parameterValue);
		} else if(this.typeSearch == 2){
			this.getAppUsersByTextAndClasification(this.parameterValue, this.clasificationSearch);
		}
	}

	onSubmitAddUser(form){
		this.preLoader2 = 1;
		this.addStatus = null;
		this.addMessage = null;
		this.errorCode = null;
		let municipality;
		if(this.newAppUsers.user_clasification_id && this.newAppUsers.user_clasification_id == 4){
			this.newAppUsers.company = 'SUBRED INTEGRADA DE SERVICIOS DE SALUD SUR E.S.E.';
		}
		if(this.newAppUsers.municipality){
			municipality = this.newAppUsers.municipality;
			delete this.newAppUsers.municipality;
		}

		this._appUsersService.newAppUsers(this.newAppUsers).subscribe(
			response => {
				this.preLoader2 = 2;
				if(response.status == 'success'){
					this.addStatus = 'success';
					this.addMessage = response.message;
					form.reset();
				}
			},
			error => {
				this.preLoader2 = 2;
				this.addStatus = 'error';
				this.errorCode = error.error.code;
				this.addMessage = error.error.message;
				if(error.error.errors && error.error.errors.id){ this.addMessage = 'El id de usuario que está intentando ingresar ya existe' }
				else{ this.addMessage = error.error.message; }
				if(error.status && error.status == 500) this.errorCode = 500;
				console.log(<any>error);
			}
		);
		if(this.newAppUsers.municipality){
			this.newAppUsers.municipality = municipality;
		}
	}

	updateAddUser(){
		this.preLoader2 = 1;
		this.addStatus = null;
		this.addMessage = null;
		this.errorCode = null;

		if(this.newAppUsers.user_clasification_id == 4){
			this.newAppUsers.company = 'SUBRED INTEGRADA DE SERVICIOS DE SALUD SUR E.S.E.';
		}
		let municipality = this.newAppUsers.municipality;
		delete this.newAppUsers.municipality;

		this._appUsersService.updateAppUsers(this.newAppUsers, this.newAppUsers.id).subscribe(
			response => {
				this.preLoader2 = 2;
				if(response.status == 'success'){
					this.addStatus = 'success';
					this.addMessage = response.message;
				}
			},
			error => {				
				this.preLoader2 = 2;
				this.addStatus = 'error';
				this.errorCode = error.error.code;
				this.addMessage = error.error.message;
				if(error.error.errors && error.error.errors.id){ this.addMessage = 'El id de usuario que está intentando ingresar ya existe' }
				else{ this.addMessage = error.error.message; }
				if(error.status && error.status == 500) this.errorCode = 500;
				console.log(<any>error);
			}
		);
		this.newAppUsers.municipality = municipality;
	}

	putDataUpdate(user){
		//delete user.municipality;
		this.newAppUsers = user;
		if(this.newAppUsers.country_id) this.departmentFind();
		if(this.newAppUsers.department_id) this.municipalityFind();
	}

	deleteAppUser(id){
		this.preloaderStatus = true;

		this._appUsersService.deleteAppUsers(this.token, id).subscribe(
			response => {
				this.preloaderStatus = false;

				if(response.status == 'success'){
					this.onSubmitSearch(id);
				}
			},
			error => {
				this.preloaderStatus = false;
				this.searchStatus = 'error';
				this.errorCode = error.error.code;
				this.searchErrorMessage = error.error.message;
				if(error.status && error.status == 500) this.errorCode = 500;
				console.log(<any>error);
			}
		);
	}

	setLocalStorage(user){
		let request = localStorage.getItem('request');
		delete user.municipality;
		localStorage.setItem('user', JSON.stringify(user));
		
		if(localStorage.getItem('request')){
			let request = localStorage.getItem('request');
			if(request == 'memorandum') this._router.navigate(['memorando/nuevo-registro']);
			if(request == 'sdqs_in') this._router.navigate(['radicado/entrada']);
			if(request == 'sdqs_out') this._router.navigate(['radicado/salida']);
			localStorage.removeItem('request');
		}
	}

	pageChange(event){
		this.actualPage = event;
	}
}
