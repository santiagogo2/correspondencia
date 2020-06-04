import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserTypeService } from '../../../services/userType.service';
import { CountryService } from '../../../services/country.service';
import { DepartmentService } from '../../../services/department.service';
import { MunicipalityService } from '../../../services/municipality.service';
import { DependenceService } from '../../../services/dependence.service';
import { AttachedService } from '../../../services/attached.service';
import { DocumentsService } from '../../../services/documents.service';
import { FiledOutService } from '../../../services/filedOut.service';
import { FiledOut } from '../../../models/filedOut';
import { AppUsers } from '../../../models/appUsers';
import { Documents } from '../../../models/documents';

@Component({
	selector: 'app-filed-out',
	templateUrl: './filed-out.component.html',
	styleUrls: ['./filed-out.component.css'],
	providers: [
		UserTypeService,
		CountryService,
		DepartmentService,
		MunicipalityService,
		DependenceService,
		AttachedService,
		DocumentsService,
		FiledOutService
	]
})
export class FiledOutComponent implements OnInit {
	public page_title: string;
	public bottomValue: string;
	public itemsStatus: boolean;
	public date: any;
	public day: any;
	public month: any;
	public year: any;
	public filedOut: FiledOut;
	public appUsers: AppUsers;
	public documents: Documents;
	public preLoader2: number;
	public preLoader3: number;
	public filedOutId: number;
	public dependenceName: string;
	public dependenceEmail: string;
	public attachedName: string;
	public documentValider: number;
	public toogleButtonNew: number;
	public document_name: string;

	public status: string;
	public errorCode: number;
	public errorMessage: string;
	public addStatus: string;
	public addMessage: string;
	public docStatus: string;
	public docMessage: string;
	public countries: any[];
	public deparments: any;
	public municipalities: any;
	public userClasification: any[];
	public dependences: any[];
	public attached: any[];

	constructor(
		private _userTypeService: UserTypeService,
		private _countryService: CountryService,
		private _departmentService: DepartmentService,
		private _municipalityService: MunicipalityService,
		private _dependenceService: DependenceService,
		private _attachedService: AttachedService,
		private _documentsService: DocumentsService,
		private _filedOutService: FiledOutService
	) {
		this.page_title = 'Módulo de Radicación Salida';
		this.bottomValue = 'Radicar';
		this.itemsStatus = false;
		this.date = new Date();
		this.day = this.date.getDate();
		this.month = +this.date.getMonth();
		this.month = this.month+1;
		this.year = this.date.getFullYear();

		this.filedOut = new FiledOut(1,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		this.appUsers = new AppUsers(null,null,null,null,null,null, null,null,null,null,null,null);
		this.documents = new Documents(1,null,null);

		this.status = null;
		this.errorCode = null;
		this.errorMessage = null;
		this.addStatus = null;
		this.addMessage = null;
		this.docStatus = null;
		this.docMessage = null;
		this.countries = null;
		this.deparments = null;
		this.municipalities = null;
		this.userClasification = null;
		this.dependences = null;
		this.attached = null;
		this.preLoader2 = 2;
		this.preLoader3 = 2;
		this.filedOutId = null;
		this.dependenceName = null;
		this.dependenceEmail = null;
		this.attachedName = null;
		this.documentValider = 1;
		this.toogleButtonNew = 1;
		this.document_name = null;
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

	departmentFind(){
		this.deparments = null;
		let country_id = this.appUsers.country_id;

		if(country_id != null && country_id != undefined){
			this._departmentService.getDepartmentByCountryId(country_id).subscribe(
				response => {
					if(response.status == 'success'){
						this.deparments = response.deparments;
						if(this.deparments == '') this.deparments = null;
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
		this.countries = null;
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

	dependencesList(){
		this.dependences = null;
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
		this.attached = null;
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

	onSubmit(filedOutForm){
		this.preLoader2 = 1;
		this.addStatus = null;
		this.addMessage = null;
		this.filedOutId = null;
		this.filedOut.app_users_id = this.appUsers.id;
		this.setDependenceName();
		this.setAttachedName();
		this.filedOut.desEntity = this.filedOut.desEntity.toUpperCase();

		this._filedOutService.newFiledOut(this.filedOut).subscribe(
			response => {
				this.preLoader2 = 2;
				if(response.status == 'success'){
					this.addStatus = 'success';
					this.filedOutId = response.filed.id;
					this.addMessage = response.message + '. El número de radicado de salida es: ' + this.filedOutId;
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
		this.toogleButtonNew = 3;
		this.docStatus = null;
		this.docMessage = null;
		this.documents.name = this.document_name;
		this.documents.document_name = this.document_name;

		this._documentsService.newDocument(this.documents).subscribe(
			response => {
				if(response.status == 'success'){
					this.filedOut.documents_id = response.document.id;

					this._filedOutService.updateFiledOut(this.filedOutId, this.filedOut).subscribe(
						response => {
							if(response.status == 'success'){
								this.functionSendEmail();
							}
						},
						error => {							
							this.preLoader3 = 2;
							this.toogleButtonNew = 1;
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
				this.toogleButtonNew = 1;
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
			sub: this.filedOutId,
			title: 'RADICADO DE SALIDA',
			name: this.appUsers.name,
			destinatary: this.filedOut.desName + ' ' + this.filedOut.desSurname + ' Entidad: ' + this.filedOut.desEntity,
			surname: this.appUsers.surname,
			second_surname: this.appUsers.second_surname,
			email: this.dependenceEmail,
			filename: this.documents.document_name
		}

		let emailParams = Object.assign(dataParams, this.filedOut);

		this._filedOutService.sendEmail(emailParams).subscribe(
			response => {
				this.preLoader3 = 2;
				if(response.status == 'success'){
					this.docStatus = 'success';
					this.docMessage = 'Se ha adjuntado el documento: ' + emailParams.filename + ' al Radicado de Salida con número: ' + this.filedOutId +
									  ' y se ha enviado un correo con los datos y el adjunto a: ' + emailParams.email;
					this.toogleButtonNew = 2;
				}
			},
			error => {
				this.preLoader3 = 2;
				this.toogleButtonNew = 1;
				this.docStatus = 'error';
				this.errorCode = error.error.code;
				this.docMessage = error.error.message;
				if(error.status && error.status == 500) this.errorCode = 500;
				console.log(<any>error);
			}
		);
	}

	setDependenceName(){
		let id = this.filedOut.dependence_id;
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
		let id = this.filedOut.attached_id;
		let attachedName;

		this.attached.forEach(function(element){
			if(element.id == id){
				attachedName = element.name;
			}
		});

		this.attachedName = attachedName;
	}

	receiveName(data):void{
		this.document_name = data;
		this.documentValider = 2;
	}

	stickerPrint(){
		window.print();
	}

	newFiledOut(form2){
		form2.reset();
		localStorage.removeItem('user');
		this.toogleButtonNew = 1;
		this.filedOut = undefined;
		this.filedOutId = null;
		localStorage.setItem('request', 'sdqs_out');
	}
}