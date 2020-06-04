// Imports necesarios para el funcionamiento del servicio
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserType } from '../models/userType';
import { global } from './global';

@Injectable()
export class UserTypeService{
	public url: string;

	constructor(
		private _http: HttpClient
	){
		this.url = global.url;
	}

	list(): Observable<any>{
		return this._http.get(this.url + 'user-clasification');
	}

	getUserType(id): Observable<any>{
		return this._http.get(this.url + 'user-clasification/'+ id);
	}

	newUserType(token, userType): Observable<any>{
		let json = JSON.stringify(userType);
		let params = "json="+json;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);
		return this._http.post(this.url + 'user-clasification', params, {headers:headers});
	}

	updateUserType(token, userType): Observable<any>{
		let json = JSON.stringify(userType);
		let params = "json="+json;
		let id = userType.id;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);
		return this._http.put(this.url + 'user-clasification/' + id, params, {headers:headers});
	}

	deleteUser(token, id): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.delete(this.url + 'user-clasification/' + id, {headers:headers});
	}
}