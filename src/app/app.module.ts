import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { routing }  from './app.routing';
import { AppComponent } from './app.component';
import { AboutComponent} from './about/about.component';
import { IssuesComponent } from './issues/issues.component';
import { IssuesService } from './issues/issues.service';
import { AppService } from './app.service';
import { IssueFilterPipe } from './issues/issuefilter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { AddFormComponent } from './issues/addform.component';
import { EditFormComponent } from './issues/editform.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
	AboutComponent,
	IssuesComponent,
	AddFormComponent,
	EditFormComponent,
	IssueFilterPipe
  ],
  imports: [
	BrowserModule,
	routing,
	HttpClientModule,
	FormsModule,
	ReactiveFormsModule
  ],
providers: [IssuesService,AppService],
bootstrap: [AppComponent]
})
export class AppModule { }