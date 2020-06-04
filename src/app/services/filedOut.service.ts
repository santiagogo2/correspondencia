// Import necesarios para el <funcionami></funcionami>ento del servicio
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FiledOut } from '../models/filedOut';
import { global } from './global';

@Injectable()
export class FiledOutService{
	public url: string;
	// public token: string;
	// public identity: any;

	constructor(
		private _http: HttpClient
	){
		this.url = global.url;
	}

	getFiledOut(filedOutId): Observable<any>{
		//let headers = new HttpHeaders.set('Authorization', token);
		//return this._http.get(this.url + 'filed-out/' + filedOutId, {headers:headers});
		return this._http.get(this.url + 'filed-out/' + filedOutId);
	}

	getFiledOutByUserId(userId): Observable<any>{
		//let headers = new HttpHeaders().set('Authorization', token);
		//return this._http.get(this.url + 'filed-out/search-appuser/' + userId, {headers:headers});
		return this._http.get(this.url + 'filed-out/search-appuser/' +  userId);
	}

	getFiledOutByAffair(affair): Observable<any>{
		//let headers = new HttpHeaders().set('Authorization', token);
		//return this._http.get(this.url + 'filed-out/search-affair/' + affair, {headers:headers});
		return this._http.get(this.url + 'filed-out/search-affair/' + affair);
	}

	newFiledOut(filedOut): Observable<any>{
		let json = JSON.stringify(filedOut);
		let params = "json=" + json;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + 'filed-out', params, {headers:headers});
	}

	updateFiledOut(id, filedOut): Observable<any>{
		let json = JSON.stringify(filedOut);
		let params = "json=" + json;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.put(this.url + 'filed-out/' + id, params, {headers:headers});
	}

	updateFiledOutDocument(id, filedOut): Observable<any>{
		let json = JSON.stringify(filedOut);
		let params = "json=" + json;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.put(this.url + 'filed-out/update-document/' + id, params, {headers:headers});
	}

	sendEmail(emailParams): Observable<any>{
		let json = JSON.stringify(emailParams);
		let params = "json=" + json;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + 'sendemail/send', params, {headers:headers});
	}
}