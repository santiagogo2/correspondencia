import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FiledInService } from '../../../services/filedIn.service';

@Component({
	selector: 'app-filed-out-model',
	templateUrl: './filed-out-model.component.html',
	styleUrls: ['./filed-out-model.component.css'],
	providers: [
		FiledInService
	]
})
export class FiledOutModelComponent implements OnInit {

	@Input() public appUsers: any;
	@Input() public userClasification: any;
	@Input() public dependences: any;
	@Input() public attached: any;
	@Input() public filedOut: any;
	@Input() public bottomValue: string;
	@Input() public filedOutId: number;
	@Input() public itemsStatus: boolean;
	@Input() public documentId: number;
	@Output() sendFlagUpdate:EventEmitter<any> = new EventEmitter()

	public date: any;
	public day: any;
	public month: any;
	public year: any;
	public filedIn: any;
	public filedInId: number;

	public status: string;
	public errorCode: number;
	public errorMessage: string;
	public filedInMessage: string;

	constructor(
		private _filedInService: FiledInService
	) {
		this.date = new Date();
		this.day = this.date.getDate();
		this.month = +this.date.getMonth();
		this.month = this.month+1;
		this.year = this.date.getFullYear();
	}

	ngOnInit() {
		if(this.documentId){
			(<HTMLInputElement> document.getElementById('initialDate')).disabled = this.itemsStatus;
		}
		(<HTMLInputElement> document.getElementById('reference')).disabled = this.itemsStatus;
		(<HTMLInputElement> document.getElementById('guide')).disabled = this.itemsStatus;
		(<HTMLInputElement> document.getElementById('dependence')).disabled = this.itemsStatus;
		(<HTMLInputElement> document.getElementById('destinataryName')).disabled = this.itemsStatus;
		(<HTMLInputElement> document.getElementById('destinatarySurname')).disabled = this.itemsStatus;
		(<HTMLInputElement> document.getElementById('destinataryEntity')).disabled = this.itemsStatus;
		(<HTMLInputElement> document.getElementById('destinataryAddress')).disabled = this.itemsStatus;
		(<HTMLInputElement> document.getElementById('foliosNumber')).disabled = this.itemsStatus;
		(<HTMLInputElement> document.getElementById('attach')).disabled = this.itemsStatus;
		(<HTMLInputElement> document.getElementById('affair')).disabled = this.itemsStatus;
		(<HTMLInputElement> document.getElementById('idFiledIn')).disabled = this.itemsStatus;
		if(this.filedOut.filed_in_id) this.filedInId = this.filedOut.filed_in_id;
	}

	setLocalStorage(){
		localStorage.setItem('request', 'sdqs_out');
	}

	associateFiledIn(){
		this.status = null;
		this.errorCode = null;
		this.errorMessage = null;
		this.filedIn = null;
		this.filedInMessage = null;

		this._filedInService.getFiledIn(this.filedInId).subscribe(
			response => {
				if(response.status == 'success'){
					this.filedIn = response.filed;
					this.filedOut.filed_in_id = this.filedIn.id;
					this.filedInMessage = 'El Radicado de Salida ha sido asociado correctamente con el Radicado de Entrada número ' + this.filedIn.id;
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
		this.sendFlagUpdate.emit();
	}

}
