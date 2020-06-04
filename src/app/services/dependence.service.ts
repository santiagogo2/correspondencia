// Import necesarios para el <funcionami></funcionami>ento del servicio
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dependences } from '../models/dependences';
import { global } from './global';

@Injectable()
export class DependenceService{
	public url: string;
	//public token: string;
	//public identity: any;

	constructor(
		private _http: HttpClient
	){
		this.url = global.url;
	}

	list(): Observable<any>{
		return this._http.get(this.url + 'dependence');
	}

	getDependence(id): Observable<any>{
		return this._http.get(this.url + 'dependence/' + id);
	}

	newDependece(token, dependence): Observable<any>{
		let json = JSON.stringify(dependence);
		let params = "json="+json;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);
		return this._http.post(this.url +  'dependence', params, {headers:headers});
	}

	updateDependence(token, dependence): Observable<any>{
		let json = JSON.stringify(dependence);
		let params = "json="+json;
		let id = dependence.id;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);
		return this._http.put(this.url + 'dependence/' + id, params, {headers:headers});
	}

	deleteDependence(token, id): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.delete(this.url + 'dependence/' + id, {headers:headers});
	}
}