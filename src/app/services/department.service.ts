// Import necesarios para el <funcionami></funcionami>ento del servicio
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../models/department';
import { global } from './global';

@Injectable()
export class DepartmentService{
	public url: string;
	//public token: string;
	//public identity: any;

	constructor(
		private _http: HttpClient
	){
		this.url = global.url;
	}

	list(): Observable<any>{
		//let headers = new HttpHeaders.set('Authorization', token);
		//return this._http.get(this.url + 'department', {headers:headers});
		return this._http.get(this.url + 'department');
	}

	getDepartment(id): Observable<any>{
		//let headers = new HttpHeaders.set('Authorization', token);
		//return this._http.get(this.url + 'department/' + id, {headers:headers});
		return this._http.get(this.url + 'department/' + id);
	}

	getDepartmentByCountryId(country_id): Observable<any>{
		//let headers = new HttpHeaders.set('Authorization', token);
		//return this._http.get(this.url + 'department/' + country_id, {headers:headers});
		return this._http.get(this.url + 'department/country/' + country_id);
	}
}