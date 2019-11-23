import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { IssuesService } from "./issues.service";


@Component({
  selector: 'editform',
  templateUrl: './editform.component.html'
})
export class EditFormComponent {

  constructor(private _issueService: IssuesService, private route: ActivatedRoute, private router: Router) { }
  _id: any;
  issue: any;
  desc: any;
severity:any;
stat:any;
created:any;
resolved:any;

  ngOnInit(): void {
      this.route.params.forEach((params: Params) => {
          this._id = +params['id'];
      });
     this._issueService.getIssues().subscribe(
      (issues:any) =>  {
		  for(var i=0;i<issues.length;i++)
		  {
		 if(this._id==issues[i]._id)
		{
			this.issue = issues[i];
		}
		  }
		this._id=this.issue._id;
		this.desc=this.issue.description;
		this.severity=this.issue.severity;
		this.stat=this.issue.status;
		this.created=this.issue.created;
		this.resolved=this.issue.resolved;
	  });
  }
  onSubmit(formValue: any){
    let updatedissue= {
		 "_id": this._id,
          "description": formValue.desc,
		  	"severity":formValue.severity,
			"status":formValue.stat,
			"created":formValue.created,
			"resolved":formValue.resolved
        };
    this._issueService.updateIssue(updatedissue).subscribe(
	(res: any) => {
		    this.router.navigate(['issues']);
	},
        error => {
          alert("Server is not responding");
        });
  }
}
