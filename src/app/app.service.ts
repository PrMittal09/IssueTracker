import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
@Injectable()
export class AppService {
	private _url="http://localhost:3000/passport";
    private httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
    };

	constructor(private _http: HttpClient){ }
	socialLogin() {
        return this._http.get(this._url,{})
    }
}