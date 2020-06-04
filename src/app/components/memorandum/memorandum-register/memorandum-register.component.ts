import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserTypeService } from '../../../services/userType.service';
import { CountryService } from '../../../services/country.service';
import { DepartmentService } from '../../../services/department.service';
import { MunicipalityService } from '../../../services/municipality.service';
import { DependenceService } from '../../../services/dependence.service';
import { MemorandumService } from '../../../services/memorandum.service';
import { DocumentsService } from '../../../services/documents.service';
import { AttachedService } from '../../../services/attached.service';
import { Memorandum } from '../../../models/memorandum';
import { AppUsers } from '../../../models/appUsers';
import { Documents } from '../../../models/documents';

@Component({
	selector: 'app-memorandum-register',
	templateUrl: './memorandum-register.component.html',
	styleUrls: ['./memorandum-register.component.css'],
	providers: [
		UserTypeService,
		CountryService,
		DepartmentService,
		MunicipalityService,
		DependenceService,
		MemorandumService,
		DocumentsService,
		AttachedService
	]
})
export class MemorandumRegisterComponent implements OnInit {
	public page_title: string;
	public bottomValue: string;
	public itemsStatus: boolean;
	public date: any;
	public day: any;
	public month: any;
	public year: any;
	public memorandum: Memorandum;
	public appUsers: AppUsers;
	public documents: Documents;

	public status: string;
	public addStatus: string;
	public errorCode: number;
	public errorMessage: string;
	public addMessage: string;
	public docStatus: string;
	public docMessage: string;
	public userClasification: any[];
	public countries: any[];
	public departments: any;
	public municipalities: any;
	public dependences: any[];
	public attached: any[];
	public preLoader2: number;
	public preLoader3: number;
	public enabledButton: number;
	public documentValider: number;
	public document_name: string;
	public memorandumId: string;
	public dependenceName: string;
	public dependenceEmail: string;
	public attachedName: string;
	public toogleButtonNew: number;

	constructor(
		private _userTypeService: UserTypeService,
		private _countryService: CountryService,
		private _departmentService: DepartmentService,
		private _municipalityService: MunicipalityService,
		private _dependenceService: DependenceService,
		private _memorandumService: MemorandumService,
		private _documentsService: DocumentsService,
		private _attachedService: AttachedService
	) {
		this.page_title = 'Radicado Interno';
		this.bottomValue = 'Radicar';
		this.itemsStatus = false;
		this.date = new Date();
		this.day = this.date.getDate();
		this.month = +this.date.getMonth();
		this.month = this.month+1;

		this.year = this.date.getFullYear();
		this.memorandum = new Memorandum(1,null,null,null,null,'',null,null,null,null);
		this.appUsers = new AppUsers(null,null,null,null,null,null, null,null,null,null,null,null);
		this.documents = new Documents(1,'','');
		this.enabledButton = 1;
		this.documentValider = 1;
		this.toogleButtonNew = 1;
		this.memorandumId = null;
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
			this.enabledButton = 2;
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

	onSubmit(form){
		this.preLoader2 = 1;
		this.addStatus = null;
		this.addMessage = null;
		this.memorandumId = null;
		this.memorandum.app_users_id = this.appUsers.id;
		this.setDependenceName();
		this.setAttachedName();

		this._memorandumService.newMemorandum(this.memorandum).subscribe(
			response => {
				this.preLoader2 = 2;
				if(response.status == 'success'){
					this.addStatus = 'success';
					this.memorandumId = response.document.id;
					this.addMessage = response.message + '. El número de radicado interno es: ' + this.memorandumId;
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

	documentSubmit(){
		this.preLoader3 = 1;
		this.docStatus = null;
		this.docMessage = null;
		this.documents.name = this.document_name;
		this.documents.document_name = this.document_name;

		this._documentsService.newDocument(this.documents).subscribe(
			response => {
				if(response.status == 'success'){
					this.memorandum.documents_id = response.document.id;

					this._memorandumService.updateMemorandum(this.memorandumId, this.memorandum).subscribe(
						response => {
							this.functionSendEmail(this.dependenceEmail, 1);
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

	functionSendEmail(selectedEmail, level){
		let dataParams = {
			sub: this.memorandumId,
			title: 'RADICADO INTERNO',
			name: this.appUsers.name,
			destinatary: this.dependenceName,
			surname: this.appUsers.surname,
			second_surname: this.appUsers.second_surname,
			email: selectedEmail,
			filename: this.documents.document_name
		}

		let emailParams = Object.assign(dataParams, this.memorandum);

		this._memorandumService.sendEmail(emailParams).subscribe(
			response => {
				if(level == 1 && response.status == 'success'){
					this.docMessage = 'Se ha adjuntado el documento: ' + emailParams.filename + ' al Radicado Interno número: ' + this.memorandumId +
									  ' y se ha enviado un correo con los datos y el adjunto a: ' + emailParams.email;
					
					if(this.appUsers.email){
							this.functionSendEmail(this.appUsers.email, 2);
					} else{
						this.preLoader3 = 2;
						this.docStatus = 'success';
						this.toogleButtonNew = 2;
					}
				}
				if(level == 2){
					this.preLoader3 = 2;
					if(response.status == 'success'){
						this.docStatus = 'success';
						this.docMessage = 'Se ha adjuntado el documento: ' + emailParams.filename + ' al Radicado Interno número: ' + this.memorandumId +
									  ' y se ha enviado un correo con los datos y el adjunto a: ' + this.dependenceEmail + 
									  '. Notificación enviada al correo del remitente: ' + emailParams.email;
						this.toogleButtonNew = 2;
					}
				}				
			},
			error => {
				if(level == 2) this.preLoader3 = 2;
				this.docStatus = 'error';
				this.errorCode = error.error.code;
				this.docMessage = error.error.message;
				if(error.status && error.status == 500) this.errorCode = 500;
				console.log(<any>error);
			}
		);
	}

	newMemorandum(form2){
		form2.reset();
		localStorage.removeItem('user');
		this.toogleButtonNew = 1;
		this.memorandum = undefined;
		this.memorandumId = null;
		localStorage.setItem('request', 'memorandum');
	}

	receiveName(data):void{
		this.document_name = data;
		this.documentValider = 2;
	}

	stickerPrint(){
		window.print();
	}

	setDependenceName(){
		let id = this.memorandum.dependence_id;
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
		let id = this.memorandum.attached_id;
		let attachedName;

		this.attached.forEach(function(element){
			if(element.id == id){
				attachedName = element.name;
			}
		});

		this.attachedName = attachedName;
	}
}
