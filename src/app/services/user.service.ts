// Imports necesarios para el funcionamiento del servicio
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()
export class UserService{
	public url: string;
	public token: string;
	public identity: any;

	constructor(
		private _http: HttpClient
	){
		this.url = global.url;
	}

	userList(token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.get(this.url + 'user', {headers:headers});
	}

	getUser(token, id): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.get(this.url + 'user/' + id, {headers:headers});
	}

	newUser(token, user): Observable<any>{
		let json = JSON.stringify(user);
		let params = "json="+json;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);
		return this._http.post(this.url + 'user', params, {headers:headers});
	}

	updateUser(token, user): Observable<any>{
		let json = JSON.stringify(user);
		let params = "json="+json;
		let id = user.id;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);
		return this._http.put(this.url + 'user/' + id, params, {headers:headers});
	}

	updatePassword(token, user): Observable<any>{
		let json = JSON.stringify(user);
		let params = 'json='+json;
		let id = user.id;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);
		return this._http.put(this.url + 'user/update-password/' + id, params, {headers:headers});
	}

	deleteUser(token, id): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.delete(this.url + 'user/' + id, {headers:headers});
	}

	signup(user, gettoken=null): Observable<any>{
		if(gettoken != null){
			user.gettoken = 'true';
		}
		let json = JSON.stringify(user);
		let params = "json="+json;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.post(this.url + 'user/login', params, {headers:headers})
	}

	getToken(){
		let token = localStorage.getItem('correspondenceToken');

		if(token && token != undefined){
			this.token = token;
		} else {
			this.token = null;
		}

		return this.token;
	}

	getIdentity(){
		let identity = JSON.parse(localStorage.getItem('correspondenceIdentity'));

		if(identity && identity != undefined){
			this.identity = identity;
		} else {
			this.identity = null;
		}

		return this.identity;
	}
}