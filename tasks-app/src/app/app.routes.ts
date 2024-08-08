import { Routes } from '@angular/router';
import { MainComponent } from '../main/main.component';
import { TeamComponent } from '../team/team.component';
import { TeamMemberComponent } from '../team-member/team-member.component';
import { MemberDetailComponent } from '../member-detail/member-detail.component';
import { FormTaskComponent } from '../task-folder/form-task/form-task.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'about-us', component: MainComponent },
  { path: 'team', component: TeamComponent },
  { path: 'team/:id', component: MemberDetailComponent },
  { path: 'add-form', component: FormTaskComponent },
  { path: 'edit-form', component: FormTaskComponent },
];
