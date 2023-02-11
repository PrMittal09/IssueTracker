import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Issue Tracker';
  constructor(private _service:AppService){}
  socialLogin() {
	  this._service.socialLogin().subscribe(
      (res:any) => {
			alert(JSON.stringify(res));
  },
      err => alert(err)
    );
  }
}
