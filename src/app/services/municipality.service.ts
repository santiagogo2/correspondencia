// Import necesarios para el <funcionami></funcionami>ento del servicio
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Municipality } from '../models/municipality';
import { global } from './global';

@Injectable()
export class MunicipalityService{
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
		return this._http.get(this.url + 'municipality');
	}

	getMunicipality(id): Observable<any>{
		//let headers = new HttpHeaders.set('Authorization', token);
		//return this._http.get(this.url + 'department/' + id, {headers:headers});
		return this._http.get(this.url + 'municipality/' + id);
	}

	getMunicipalityByDepartmentId(department_id): Observable<any>{
		//let headers = new HttpHeaders.set('Authorization', token);
		//return this._http.get(this.url + 'department/' + department_id, {headers:headers});
		return this._http.get(this.url + 'municipality/department/' + department_id);
	}
}