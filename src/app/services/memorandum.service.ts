// Import necesarios para el <funcionami></funcionami>ento del servicio
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Memorandum } from '../models/memorandum';
import { global } from './global';

@Injectable()
export class MemorandumService{
	public url: string;
	//public token: string;
	// public identity: any;
	public url_prueba: string;

	constructor(
		private _http: HttpClient
	){
		this.url = global.url;
		this.url_prueba = '/websamples.countryinfo/CountryInfoService.wso?WSDL';
	}

	list(): Observable<any>{
		return this._http.get(this.url + 'memorandum');
	}

	getMemorandum(memorandumId): Observable<any>{
		//let headers = new HttpHeaders().set('Authorization', token);
		//return this._http.get(this.url + 'memorandum/' + memorandumId, {headers:headers});
		return this._http.get(this.url + 'memorandum/' + memorandumId);
	}

	getMemorandumByUserId(userId): Observable<any>{
		//let headers = new HttpHeaders().set('Authorization', token);
		//return this._http.get(this.url + 'memorandum/search-appuser/' + userId, {headers:headers});
		return this._http.get(this.url + 'memorandum/search-appuser/' + userId);
	}

	getMemorandumByAffair(affair): Observable<any>{
		//let headers = new HttpHeaders().set('Authorization', token);
		//return this._http.get(this.url + 'memorandum/search-affair/' + affair, {headers:headers});
		return this._http.get(this.url + 'memorandum/search-affair/' + affair);
	}

	newMemorandum(memorandum): Observable<any>{
		let json = JSON.stringify(memorandum);
		let params = "json=" + json;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + 'memorandum', params, {headers:headers});
	}

	updateMemorandum(id, memorandum): Observable<any>{
		let json = JSON.stringify(memorandum);
		let params = "json=" + json;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.put(this.url + 'memorandum/' + id, params, {headers:headers});
	}

	sendEmail(emailParams): Observable<any>{
		let json = JSON.stringify(emailParams);
		let params = "json=" + json;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + 'sendemail/send', params, {headers:headers});
	}
}