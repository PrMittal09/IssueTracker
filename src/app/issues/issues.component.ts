import { Component, OnInit } from '@angular/core';
import { IssuesService } from './issues.service';

@Component({
  selector: 'issue-root',
  templateUrl: './issues.component.html'
})
export class IssuesComponent implements OnInit{
	constructor(private _issuesService: IssuesService) { }
	searchFilter:any
	issues: any[];
	res:any[];
	delid:Array<string> = [];
	fields:Array<string> = ["ID","Description","Severity","Status","Created At","Resolved At"];
	getfields:Array<string> =  ["ID","Description","Severity","Status","Created At","Resolved At"];
	
	ngOnInit() {
		this.getIssues();
	}

	getIssues() {
		this._issuesService.getIssues().subscribe(
		(issues:any) => {
			this.issues = issues;
		},
			err => console.log(err)
		);
	}

  
  	checkData(e,_id) {
	  if(e.target.checked==true) {
		this.delid.push(_id);
	  }
	  else {
		this.delid.splice(this.delid.indexOf(_id),1);
	  }
  	}

    deleteIssue(ev) {
		if(ev.target.value=='delete'){
			for(var i=0;i<this.delid.length;i++) {
				this._issuesService.deleteIssue(this.delid[i]).subscribe((data:any) => {
					this.getIssues();
				});
			}
		}
	}
    deleteIssueid(_id) {
		this._issuesService.deleteIssue(_id).subscribe((data:any) => this.getIssues());
	}
	
	myList(e) {
		if(e.target.checked) {
			for(var i=0;i<this.fields.length;i++) {
				if(e.target.value==this.fields[i]) {
					this.getfields.push(this.fields[i]);
				}
			}
		}		
		else {
			this.getfields.splice(this.getfields.indexOf(e.target.value),1);
		}
	}

	needed(s) {
		return (this.getfields.indexOf(s) > -1);
	}
}