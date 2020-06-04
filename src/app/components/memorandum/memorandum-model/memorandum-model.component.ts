import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DepartmentService } from '../../../services/department.service';
import { MunicipalityService } from '../../../services/municipality.service';

@Component({
	selector: 'app-memorandum-model',
	templateUrl: './memorandum-model.component.html',
	styleUrls: ['./memorandum-model.component.css'],
	providers: [
		DepartmentService,
		MunicipalityService
	]
})
export class MemorandumModelComponent implements OnInit {
	@Input() public appUsers: any;
	@Input() public memorandum: any;
	@Input() public userClasification: any;
	@Input() public countries: any;
	@Input() public departments: any;
	@Input() public municipalities: any;
	@Input() public attached: any;
	@Input() public dependences: any;
	@Input() public bottomValue: string;
	@Input() public memorandumId: number;
	@Input() public itemsStatus: boolean;
	@Input() public status: string;
	@Input() public errorCode: number;
	@Input() public errorMessage: string;
	@Output() sendFlagUpdate:EventEmitter<any> = new EventEmitter()

	public date: any;
	public day: any;
	public month: any;
	public year: any;


	constructor(
		private _departmentService: DepartmentService,
		private _municipalityService: MunicipalityService
	) {
		this.date = new Date();
		this.year = this.date.getFullYear();
		this.day = this.date.getDate();
		this.month = +this.date.getMonth();
		this.month = this.month+1;		
	}

	ngOnInit() {
		(<HTMLInputElement> document.getElementById('initialDate')).disabled = this.itemsStatus;
		(<HTMLInputElement> document.getElementById('reference')).disabled = this.itemsStatus;
		(<HTMLInputElement> document.getElementById('guide')).disabled = this.itemsStatus;
		(<HTMLInputElement> document.getElementById('affair')).disabled = this.itemsStatus;
		(<HTMLInputElement> document.getElementById('foliosNumber')).disabled = this.itemsStatus;
		(<HTMLInputElement> document.getElementById('attach')).disabled = this.itemsStatus;
		(<HTMLInputElement> document.getElementById('dependence')).disabled = this.itemsStatus;
	}

	setLocalStorage(){
		localStorage.setItem('request', 'memorandum');
	}

	onSubmit(memorandumForm){
		this.sendFlagUpdate.emit();
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
}
