// Import necesarios para el funcionamiento del servicio
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../models/country';
import { global } from './global';

@Injectable()
export class CountryService{
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
		//return this._http.get(this.url + 'country', {headers:headers});
		return this._http.get(this.url + 'country');
	}

	getCountry(id): Observable<any>{
		//let headers = new HttpHeaders.set('Authorization', token);
		//return this._http.get(this.url + 'country/' + id, {headers:headers});
		return this._http.get(this.url + 'country/' + id);
	}
}