// Import necesarios para el funcionamiento del servicio
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppUsers } from '../models/appUsers';
import { global } from './global';

@Injectable()
export class AppUsersService{
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
		//return this._http.get(this.url + 'app-users', {headers:headers});
		return this._http.get(this.url + 'app-users');
	}

	getAppUsers(id): Observable<any>{
		//let headers = new HttpHeaders.set('Authorization', token);
		//return this._http.get(this.url + 'app-users/' + id, {headers:headers});
		return this._http.get(this.url + 'app-users/' + id);
	}

	getAppUsersByTextAndClasification(text, clasification): Observable<any>{
		//let headers = new HttpHeaders.set('Authorization', token);
		//return this._http.get(this.url + 'app-users/text/clasification/' + text + '/' + clasification, {headers:headers});
		return this._http.get(this.url + 'app-users/text/clasification/' + text + '/' + clasification);
	}

	newAppUsers(appUser): Observable<any>{
		let json = JSON.stringify(appUser);
		let params = "json=" + json;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + 'app-users', params, {headers:headers})
	}

	updateAppUsers(appUser, id): Observable<any>{
		let json = JSON.stringify(appUser);
		let params = "json=" + json;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.put(this.url + 'app-users/' + id, params, {headers:headers});
	}

	deleteAppUsers(token, id): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.delete(this.url + 'app-users/' + id, {headers:headers});
	}
}