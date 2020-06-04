// Import necesarios para el <funcionami></funcionami>ento del servicio
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FiledIn } from '../models/filedIn';
import { global } from './global';

@Injectable()
export class FiledInService{
	public url: string;
	//public token: string;
	// public identity: any;

	constructor(
		private _http: HttpClient
	){
		this.url = global.url;
	}

	getFiledIn(filedInId): Observable<any>{
		//let headers = new HttpHeaders.set('Authorization', token);
		//return this._http.get(this.url + 'filed-in/' + filedInId, {headers:headers});
		return this._http.get(this.url + 'filed-in/' + filedInId);
	}

	getFiledInByUserId(userId): Observable<any>{
		//let headers = new HttpHeaders().set('Authorization', token);
		//return this._http.get(this.url + 'filed-in/search-appuser/' + userId, {headers:headers});
		return this._http.get(this.url + 'filed-in/search-appuser/' +  userId);
	}

	getFiledInByAffair(affair): Observable<any>{
		//let headers = new HttpHeaders().set('Authorization', token);
		//return this._http.get(this.url + 'filed-in/search-affair/' + affair, {headers:headers});
		return this._http.get(this.url + 'filed-in/search-affair/' + affair);
	}

	newFiledIn(filedIn): Observable<any>{
		let json = JSON.stringify(filedIn);
		let params = "json=" + json;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + 'filed-in', params, {headers:headers});
	}

	updateFiledIn(id, filedIn): Observable<any>{
		let json = JSON.stringify(filedIn);
		let params = "json=" + json;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.put(this.url + 'filed-in/' + id, params, {headers:headers});
	}

	sendEmail(emailParams): Observable<any>{
		let json = JSON.stringify(emailParams);
		let params = "json=" + json;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + 'sendemail/send', params, {headers:headers});
	}
}