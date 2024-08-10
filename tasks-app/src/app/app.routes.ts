import { Routes } from '@angular/router';
import { MainComponent } from '../main/main.component';
import { TeamComponent } from '../team/team.component';
import { TeamMemberComponent } from '../team-member/team-member.component';
import { MemberDetailComponent } from '../member-detail/member-detail.component';
import { FormTaskComponent } from '../task-folder/form-task/form-task.component';
import { TaskResolver } from '../_resolvers/task.resolver';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { showLeavePageConfirmationDialogGuard } from '../_guards/show-leave-page-confirmation-dialog.guard';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'about-us', component: MainComponent },
  { path: 'team', component: TeamComponent },
  { path: 'team/:id', component: MemberDetailComponent },
  {
    path: 'add-form',
    component: FormTaskComponent,
    canDeactivate: [showLeavePageConfirmationDialogGuard],
  },
  {
    path: 'edit-form/:id',
    component: FormTaskComponent,
    canDeactivate: [showLeavePageConfirmationDialogGuard],
    resolve: {
      task: TaskResolver,
    },
  },
  { path: '**', component: PageNotFoundComponent },
];
