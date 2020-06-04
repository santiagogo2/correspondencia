import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserTypeService } from '../../../services/userType.service';
import { CountryService } from '../../../services/country.service';
import { DepartmentService } from '../../../services/department.service';
import { MunicipalityService } from '../../../services/municipality.service';
import { DependenceService } from '../../../services/dependence.service';
import { AttachedService } from '../../../services/attached.service';
import { FiledInService } from '../../../services/filedIn.service';
import { DocumentsService } from '../../../services/documents.service';
import { FiledIn } from '../../../models/filedIn';
import { AppUsers } from '../../../models/appUsers';
import { Documents } from '../../../models/documents';

@Component({
	selector: 'app-filed-in',
	templateUrl: './filed-in.component.html',
	styleUrls: ['./filed-in.component.css'],
	providers: [
		UserTypeService,
		CountryService,
		DepartmentService,
		MunicipalityService,
		DependenceService,
		AttachedService,
		FiledInService,
		DocumentsService
	]
})
export class FiledInComponent implements OnInit {
	public page_title: string;
	public bottomValue: string;
	public filedIn: FiledIn;
	public appUsers: AppUsers;
	public documents: Documents;
	public preLoader2: number;
	public preLoader3: number;
	public itemsStatus: boolean;
	public date: any;
	public day: any;
	public month: any;
	public year: any;

	public status: string;
	public errorCode: number;
	public errorMessage: string;
	public addStatus: string;
	public addMessage: string;
	public docStatus: string;
	public docMessage: string;
	public userClasification: any[];
	public countries: any[];
	public departments: any;
	public municipalities: any;
	public dependences: any[];
	public attached: any[];
	public filedInId: string;
	public toogleButtonNew: number;
	public documentValider: number;
	public document_name: string;
	public dependenceName: string;
	public dependenceEmail: string;
	public attachedName: string;

	constructor(
		private _userTypeService: UserTypeService,
		private _countryService: CountryService,
		private _departmentService: DepartmentService,
		private _municipalityService: MunicipalityService,
		private _dependenceService: DependenceService,
		private _attachedService: AttachedService,
		private _filedInService: FiledInService,
		private _documentsService: DocumentsService
	) {
		this.page_title = 'Módulo de Radicación Entrada';
		this.bottomValue = 'Radicar';
		this.preLoader2 = 2;
		this.preLoader3 = 2;
		this.itemsStatus = false;
		this.date = new Date();
		this.day = this.date.getDate();
		this.month = +this.date.getMonth();
		this.month = this.month+1;
		this.year = this.date.getFullYear();

		this.addStatus = null;
		this.addMessage = null;
		this.docStatus = null;
		this.docMessage = null;
		this.filedInId = null;
		this.toogleButtonNew = 1;
		this.documentValider = 1;

		this.filedIn = new FiledIn(1,null,null,null,null,null,null,null,null,null);
		this.appUsers = new AppUsers(null,null,null,null,null,null, null,null,null,null,null,null);
		this.documents = new Documents(1,'','');
	}

	ngOnInit() {
		this.getUser();
		this.userTypeList();
		this.countryList();
		this.dependencesList();
		this.attachedList();
	}

	getUser(){
		if(localStorage.getItem('user')){
			this.appUsers = JSON.parse(localStorage.getItem('user'));			
			if(this.appUsers.country_id) this.departmentFind();
			if(this.appUsers.department_id) this.municipalityFind();
		}
	}

	userTypeList(){
		this._userTypeService.list().subscribe(
			response => {
				if(response.status == 'success'){
					this.userClasification = response.usersClasification;
				}
			},
			error =>{
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
		let country_id = this.appUsers.country_id;

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
		let department_id = this.appUsers.department_id;

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

	dependencesList(){
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

	setLocalStorage(){
		localStorage.setItem('request', 'sdqs_in');
	}

	onSubmit(form){
		this.preLoader2 = 1;
		this.addStatus = null;
		this.addMessage = null;
		this.filedInId = null;
		this.filedIn.app_users_id = this.appUsers.id;
		this.setDependenceName();
		this.setAttachedName();

		this._filedInService.newFiledIn(this.filedIn).subscribe(
			response => {
				this.preLoader2 = 2;
				if(response.status == 'success'){
					this.addStatus = 'success';
					this.filedInId = response.filed.id;
					this.addMessage = response.message + '. El número de radicado de entrada es: ' + this.filedInId;
				}
			},
			error => {				
				this.preLoader2 = 2;
				this.addStatus = 'error';
				this.errorCode = error.error.code;
				this.addMessage = error.error.message;
				if(error.status && error.status == 500) this.errorCode = 500;
				console.log(<any>error);
			}
		);
	}

	documentSubmit(form){
		this.preLoader3 = 1;
		this.docStatus = null;
		this.docMessage = null;
		this.documents.name = this.document_name;
		this.documents.document_name = this.document_name;

		this._documentsService.newDocument(this.documents).subscribe(
			response => {
				if(response.status == 'success'){
					this.filedIn.documents_id = response.document.id;

					this._filedInService.updateFiledIn(this.filedInId, this.filedIn).subscribe(
						response => {
							if(response.status == 'success'){
								this.functionSendEmail();
							}
						},
						error => {
							this.preLoader3 = 2;
							this.docStatus = 'error';
							this.errorCode = error.error.code;
							this.docMessage = error.error.message;
							if(error.status && error.status == 500) this.errorCode = 500;
							console.log(<any>error);
						}
					);
				}
			},
			error => {
				this.preLoader3 = 2;
				this.docStatus = 'error';
				this.errorCode = error.error.code;
				this.docMessage = error.error.message;
				if(error.status && error.status == 500) this.errorCode = 500;
				console.log(<any>error);
			}
		);
	}

	functionSendEmail(){
		let dataParams = {
			sub: this.filedInId,
			title: 'RADICADO DE ENTRADA',
			name: this.appUsers.name,
			destinatary: this.dependenceName,
			surname: this.appUsers.surname,
			second_surname: this.appUsers.second_surname,
			email: this.dependenceEmail,
			filename: this.documents.document_name
		}

		let emailParams = Object.assign(dataParams, this.filedIn);

		this._filedInService.sendEmail(emailParams).subscribe(
			response => {
				this.preLoader3 = 2;
				if(response.status == 'success'){
					this.docStatus = 'success';
					this.docMessage = 'Se ha adjuntado el documento: ' + emailParams.filename + ' al Radicado de Entrada con número: ' + this.filedInId +
									  ' y se ha enviado un correo con los datos y el adjunto a: ' + emailParams.email
					this.toogleButtonNew = 2;
				}
			},
			error => {
				this.preLoader3 = 2;
				this.docStatus = 'error';
				this.errorCode = error.error.code;
				this.docMessage = error.error.message;
				if(error.status && error.status == 500) this.errorCode = 500;
				console.log(<any>error);
			}
		);
	}

	receiveName(data):void{
		this.document_name = data;
		this.documentValider = 2;
	}

	stickerPrint(){
		window.print();
	}

	setDependenceName(){
		let id = this.filedIn.dependence_id;
		let dependenceName;
		let dependenceEmail;

		this.dependences.forEach(function(element){
			if(element.id == id){
				dependenceName = element.name;
				dependenceEmail = element.email;
			}
		});
		
		this.dependenceName = dependenceName;
		this.dependenceEmail = dependenceEmail;
	}

	setAttachedName(){
		let id = this.filedIn.attached_id;
		let attachedName;

		this.attached.forEach(function(element){
			if(element.id == id){
				attachedName = element.name;
			}
		});

		this.attachedName = attachedName;
	}

	newFiledIn(form2){
		form2.reset();
		localStorage.removeItem('user');
		this.toogleButtonNew = 1;
		this.filedIn = undefined;
		this.filedInId = null;
		localStorage.setItem('request', 'sdqs_in');
	}
}
