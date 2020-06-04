// Imports necesarios para el funcionamiento del servicio
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()
export class DocumentsService{
	public url: string;
	//public token: string;
	//public identity: any;

	constructor(
		private _http: HttpClient
	){
		this.url = global.url;
	}

	newDocument(document): Observable<any>{
		let json = JSON.stringify(document);
		let params = "json=" + json;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + 'documents', params, {headers:headers});
	}
}