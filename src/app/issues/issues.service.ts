import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class IssuesService {
	private _issuesUrl = "http://localhost:3000/issue";
	private _url="http://localhost:3000/message";
    private httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
    };

	constructor(private _http: HttpClient){ this.getIssueCount();}
	
	getIssues() {
        return this._http.get(this._issuesUrl);
    }

	private count;
	getIssueCount() {
		this.getIssues().subscribe((issues:any) =>this.count=issues[issues.length-1]._id);
	}
	addIssue(formValue: any) {
		let newissue = {
		"_id": ++this.count,
		"description": formValue.desc,
		"severity":formValue.severity,
		"status":formValue.stat,
		"created":formValue.created,
		"resolved":formValue.resolved
		}
		return this._http.post(this._issuesUrl+'/addIssue',newissue,this.httpOptions);
  	}
    updateIssue(updatedIssue: any) {
		let editURL = `${this._issuesUrl+'/editIssue'}/${updatedIssue._id}`;
		return this._http.put(editURL, updatedIssue , this.httpOptions);
  	}
    deleteIssue(_id) {
		let deleteIssueURL = `${this._issuesUrl+'/deleteIssue'}/${_id}`;
        return this._http.delete(deleteIssueURL);
  	}
}