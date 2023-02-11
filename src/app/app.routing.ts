import { Routes, RouterModule } from '@angular/router';
import {AboutComponent} from './about/about.component';
import {IssuesComponent } from './issues/issues.component';
import { AddFormComponent } from './issues/addform.component';
import { EditFormComponent } from './issues/editform.component';

const appRoutes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'issues', component:IssuesComponent },
  { path: 'addIssue', component: AddFormComponent},
  { path: 'editIssue/:id', component: EditFormComponent},
  { path: '', redirectTo: 'about', pathMatch: 'full'}
];

export const routing = RouterModule.forRoot(appRoutes);