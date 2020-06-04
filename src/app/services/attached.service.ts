// Import necesarios para el <funcionami></funcionami>ento del servicio
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppUsers } from '../models/appUsers';
import { global } from './global';

@Injectable()
export class AttachedService{
	public url: string;
	//public token: string;
	//public identity: any;

	constructor(
		private _http: HttpClient
	){
		this.url = global.url;
	}

	list(): Observable<any>{
		return this._http.get(this.url + 'attached');
	}

	getAttached(id): Observable<any>{
		return this._http.get(this.url + 'attached/' + id);
	}

	newAttached(token, attached): Observable<any>{
		let json = JSON.stringify(attached);
		let params = "json="+json;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);
		return this._http.post(this.url + 'attached', params, {headers:headers});
	}

	updateAttached(token, attached): Observable<any>{
		let json = JSON.stringify(attached);
		let params = "json="+json;
		let id = attached.id;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);
		return this._http.put(this.url + 'attached/' + id, params, {headers:headers});
	}

	deleteAttached(token, id): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.delete(this.url + 'attached/' + id, {headers:headers});
	}
}