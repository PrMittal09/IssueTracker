import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IssuesService } from "./issues.service";
import { IssuesComponent } from "./issues.component";

@Component({
	  providers:[IssuesComponent ],
  selector: 'addform',
  templateUrl: './addform.component.html'
})
export class AddFormComponent {
  constructor(private _issuesService: IssuesService, private router: Router ) { }
  desc: any;
  severity:any;
  stat:any;
  created:any;
  resolved:any;
  onSubmit(formValue: any){

	return this._issuesService.addIssue(formValue).subscribe(
		(res: any) => {
			this.router.navigate(['issues']);
	},
        error => {
          alert('ID is present');
        });
  }
}
