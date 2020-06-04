import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserTypeService } from '../../../services/userType.service';
import { CountryService } from '../../../services/country.service';
import { DepartmentService } from '../../../services/department.service';
import { MunicipalityService } from '../../../services/municipality.service';
import { DependenceService } from '../../../services/dependence.service';
import { AttachedService } from '../../../services/attached.service';
import { FiledInService } from '../../../services/filedIn.service';
import { FiledOutService } from '../../../services/filedOut.service';
import { MemorandumService } from '../../../services/memorandum.service';
import { DocumentsService } from '../../../services/documents.service';
import { global } from '../../../services/global';
import { Documents } from '../../../models/documents';

@Component({
	selector: 'app-filed-search',
	templateUrl: './filed-search.component.html',
	styleUrls: ['./filed-search.component.css'],
	providers: [
		UserTypeService,
		CountryService,
		DepartmentService,
		MunicipalityService,
		DependenceService,
		AttachedService,
		FiledInService,
		FiledOutService,
		MemorandumService,
		DocumentsService
	]
})
export class FiledSearchComponent implements OnInit {
	public page_title: string;
	public page_title2: string;
	public page_title3: string;
	public bottomValue: string;
	public itemsStatus: boolean;
	public preLoader: number;
	public preLoader2: number;
	public filedSelected: any;
	public itemsPerPage: number;
	public actualPage: number;
	public date: any;
	public day: any;
	public month: any;
	public year: any;
	public filedIn: any;
	public documents: Documents;

	public status: string;
	public errorCode: number;
	public errorMessage: string;
	public searchStatus: string;
	public searchErrorMessage: string;
	public docStatus: string;
	public docMessage: string;
	public typeField: number;
	public searchId: number;
	public affairSearchValue: string;
	public idNumberValue: number;

	public userClasification: any;
	public appUsers: any;
	public countries: any;
	public departments: any;
	public municipalities: any;
	public dependences: any;
	public attached: any;
	public filed: any;
	public documentUrl: string;
	public dependenceName: string;
	public attachedName: string;
	public document_name: string;
	public documentValider: number;
	public toogleButtonDocument: number;

	constructor(
		private _userTypeService: UserTypeService,
		private _countryService: CountryService,
		private _departmentService: DepartmentService,
		private _municipalityService: MunicipalityService,
		private _dependenceService: DependenceService,
		private _attachedService: AttachedService,
		private _filedInService: FiledInService,
		private _filedOutService: FiledOutService,
		private _memorandumService: MemorandumService,
		private _documentsService: DocumentsService
	) {

		this.documents = new Documents(1,null,null);

		this.page_title = 'Buscar Radicados';
		this.page_title2 = null;
		this.page_title3 = null;
		this.bottomValue = 'Actualizar Radicado';
		this.itemsStatus = true;
		this.preLoader = 2;
		this.preLoader2 = 2;
		this.filed = null;
		this.filedSelected = null;
		this.itemsPerPage = 10;
		this.actualPage = 1;
		this.date = new Date();
		this.day = this.date.getDate();
		this.month = +this.date.getMonth();
		this.month = this.month+1;
		this.year = this.date.getFullYear();

		this.typeField = null;
		this.searchId = null;
		this.affairSearchValue = null;
		this.idNumberValue = null;
		this.documentValider = 1;
		this.document_name = null;

		this.appUsers = null;
		this.documentUrl = global.documentUrl;
		this.toogleButtonDocument = 1;
	}

	ngOnInit() {
		this.userTypeList();
		this.countryList();
		this.dependencesList();
		this.attachedList();
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

	departmentFind(countryId){
		this.departments = null;

		if(countryId != null && countryId != undefined){
			this._departmentService.getDepartmentByCountryId(countryId).subscribe(
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

	municipalityFind(departmentId){
		this.municipalities = null;

		if(departmentId != null && departmentId != undefined){
			this._municipalityService.getMunicipalityByDepartmentId(departmentId).subscribe(
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

	onSubmitSearch(){
		this.filedSelected = null;
		this.actualPage = 1;
		this.page_title2 = null;
		this.preLoader = 1;
		this.filed = null;
		this.searchStatus = null;
		this.searchErrorMessage = null;
		this.dependenceName = null;
		this.attachedName = null;

		if(this.searchId == 1){
			if(this.typeField == 1){
				// Rutina para consultar el RADICADO DE ENTRADA
				this.page_title2 = 'RESULTADOS DE LA BUSQUEDA RADICADOS DE ENTRADA';
				this.page_title3 = 'RADICADO DE ENTRADA # ';
				this._filedInService.getFiledIn(this.idNumberValue).subscribe(
					response => {
						this.preLoader = 2;
						if(response.status == 'success'){
							this.filed = response.filed;
							if(this.filed.length == null){	
								this.filed = [];
								this.filed.push(response.filed);
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
			} else if(this.typeField == 2){
				// Rutina para consultar el RADICADO DE SALIDA
				this.page_title2 = 'RESULTADOS DE LA BUSQUEDA RADICADOS DE SALIDA';
				this.page_title3 = 'RADICADO DE SALIDA # ';
				this._filedOutService.getFiledOut(this.idNumberValue).subscribe(
					response => {
						this.preLoader = 2;
						if(response.status == 'success'){
							this.filed = response.filed;
							if(this.filed.length == null){	
								this.filed = [];
								this.filed.push(response.filed);
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
			} else if(this.typeField == 3){
				// Rutina para consultar el MEMORANDO
				this.page_title2 = 'RESULTADOS DE LA BUSQUEDA MEMORANDOS';
				this.page_title3 = 'MEMORANDO # ';
				this._memorandumService.getMemorandum(this.idNumberValue).subscribe(
					response => {
						this.preLoader = 2;
						if(response.status == 'success'){
							this.filed = response.filed;
							if(this.filed.length == null){	
								this.filed = [];
								this.filed.push(response.filed);
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
		} else if(this.searchId == 2){
			if(this.typeField == 1){
				// Rutina para consultar el RADICADO DE ENTRADA
				this.page_title2 = 'RESULTADOS DE LA BUSQUEDA RADICADOS DE ENTRADA';
				this.page_title3 = 'RADICADO DE ENTRADA # ';
				this._filedInService.getFiledInByUserId(this.idNumberValue).subscribe(
					response => {
						this.preLoader = 2;
						if(response.status == 'success'){
							this.filed = response.filed;
							if(this.filed == ''){
								this.filed = null;
								this.searchStatus = 'error';
								this.searchErrorMessage = 'No se ha encontrado ningún Radicado de Entrada con el numero de documento ' + this.idNumberValue;
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
			} else if(this.typeField == 2){
				// Rutina para consultar el RADICADO DE SALIDA
				this.page_title2 = 'RESULTADOS DE LA BUSQUEDA RADICADOS DE SALIDA';
				this.page_title3 = 'RADICADO DE SALIDA # ';
				this._filedOutService.getFiledOutByUserId(this.idNumberValue).subscribe(
					response => {
						this.preLoader = 2;
						if(response.status == 'success'){
							this.filed = response.filed;
							if(this.filed == ''){
								this.filed = null;
								this.searchStatus = 'error';
								this.searchErrorMessage = 'No se ha encontrado ningún Radicado de Salida con el numero de documento ' + this.idNumberValue;
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
			} else if(this.typeField == 3){
				// Rutina para consultar el MEMORANDO
				this.page_title2 = 'RESULTADOS DE LA BUSQUEDA MEMORANDOS';
				this.page_title3 = 'MEMORANDO # ';
				this._memorandumService.getMemorandumByUserId(this.idNumberValue).subscribe(
					response => {
						this.preLoader = 2;
						if(response.status == 'success'){
							this.filed = response.filed;
							if(this.filed == ''){
								this.searchStatus = 'error';
								this.searchErrorMessage = 'No se ha encontrado ningún Radicado Interno con el numero de documento ' + this.idNumberValue;
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
		} else if(this.searchId == 3){
			if(this.typeField == 1){
				// Rutina para consultar el RADICADO DE ENTRADA
				this.page_title2 = 'RESULTADOS DE LA BUSQUEDA RADICADOS DE ENTRADA';
				this.page_title3 = 'RADICADO DE ENTRADA # ';
				this._filedInService.getFiledInByAffair(this.affairSearchValue).subscribe(
					response => {
						this.preLoader = 2;
						if(response.status == 'success'){
							this.filed = response.filed;
							if(this.filed == ''){
								this.filed = null;
								this.searchStatus = 'error';
								this.searchErrorMessage = 'No se ha encontrado ningún Radicado de Entrada cuyo asunto contenga el texto ' + this.affairSearchValue;
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
			} else if(this.typeField == 2){
				// Rutina para consultar el RADICADO DE SALIDA
				this.page_title2 = 'RESULTADOS DE LA BUSQUEDA RADICADOS DE SALIDA';
				this.page_title3 = 'RADICADO DE SALIDA # ';
				this._filedOutService.getFiledOutByAffair(this.affairSearchValue).subscribe(
					response => {
						this.preLoader = 2;
						if(response.status == 'success'){
							this.filed = response.filed;
							if(this.filed == ''){
								this.filed = null;
								this.searchStatus = 'error';
								this.searchErrorMessage = 'No se ha encontrado ningún Radicado de Salida cuyo asunto contenga el texto ' + this.affairSearchValue;
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
			} else if(this.typeField == 3){
				// Rutina para consultar el MEMORANDO
				this.page_title2 = 'RESULTADOS DE LA BUSQUEDA MEMORANDOS';
				this.page_title3 = 'MEMORANDO # ';
				this._memorandumService.getMemorandumByAffair(this.affairSearchValue).subscribe(
					response => {
						this.preLoader = 2;
						if(response.status == 'success'){
							this.filed = response.filed;
							if(this.filed == ''){
								this.searchStatus = 'error';
								this.searchErrorMessage = 'No se ha encontrado ningún Radicado Interno cuyo asunto contenga el texto ' + this.affairSearchValue;
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
		}
	}

	documentSubmit(){
		this.preLoader2 = 1;
		this.toogleButtonDocument = 2;
		this.docStatus = null;
		this.docMessage = null;
		this.documents.name = this.document_name;
		this.documents.document_name = this.document_name;

		this._documentsService.newDocument(this.documents).subscribe(
			response => {
				if(response.status == 'success'){
					this.filedSelected.documents_id = response.document.id;

					this._filedOutService.updateFiledOutDocument(this.filedSelected.id, this.filedSelected).subscribe(
						response => {
							if(response.status == 'success'){
								this._filedOutService.getFiledOut(this.filedSelected.id).subscribe(
									response => {
										if(response.status == 'success'){
											this.preLoader2 = 2;
											this.filedSelected = response.filed;
											(<HTMLInputElement> document.getElementById('initialDate')).disabled = true;
										}
									},
									error => {
										this.preLoader2 = 2;
										this.toogleButtonDocument = 1;
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
							this.preLoader2 = 2;
							this.toogleButtonDocument = 1;
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
				this.preLoader2 = 2;
				this.toogleButtonDocument = 1;
				this.docStatus = 'error';
				this.errorCode = error.error.code;
				this.docMessage = error.error.message;
				if(error.status && error.status == 500) this.errorCode = 500;
				console.log(<any>error);
			}
		);
	}

	documentUpdate(){

	}

	seeFiled(id){
		let filedSelected;

		this.filed.forEach(function(element){
			if(id == element.id){
				filedSelected = element;
			}
		});		
		this.filedSelected = filedSelected;

		if(this.typeField==2){
			this.setDependenceName();
			this.setAttachedName();			
		}
		if(this.filedSelected.app_users.country_id) this.departmentFind(this.filedSelected.app_users.country_id);
		if(this.filedSelected.app_users.department_id) this.municipalityFind(this.filedSelected.app_users.department_id);
	}

	receiveName(data):void{
		this.document_name = data;
		this.documentValider = 2;
	}

	onSubmit(){
		console.log('aja');
	}

	stickerPrint(){
		window.print();
	}

	resetFiledSelected(){
		this.filedSelected = null;
	}

	setDependenceName(){
		let id = this.filedSelected.dependence_id;
		let dependenceName;

		this.dependences.forEach(function(element){
			if(element.id == id){
				dependenceName = element.name;
			}
		});
		
		this.dependenceName = dependenceName;
	}

	setAttachedName(){
		let id = this.filedSelected.attached_id;
		let attachedName;

		this.attached.forEach(function(element){
			if(element.id == id){
				attachedName = element.name;
			}
		});

		this.attachedName = attachedName;
	}

	pageChange(event){
		this.actualPage = event;
	}
}
