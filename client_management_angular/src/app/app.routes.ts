import { Routes } from '@angular/router';
import { MeetingListComponent } from './components/meeting-list/meeting-list.component';
import { UpdateMeetingComponent } from './components/update-meeting/update-meeting.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { UpdateClientComponent } from './components/update-client/update-client.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { UpdateProjectComponent } from './components/update-project/update-project.component';
import { ErrorComponent } from './components/error/error.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'meetings',
  },
  {
    path: 'meetings',
    component: MeetingListComponent,
    pathMatch: 'full',
  },
  {
    path: 'meetings/create',
    component: UpdateMeetingComponent,
  },
  {
    path: 'meetings/:id/update',
    component: UpdateMeetingComponent,
  },
  {
    path: 'clients',
    component: ClientListComponent,
    pathMatch: 'full',
  },
  {
    path: 'clients/create',
    component: UpdateClientComponent,
  },
  {
    path: 'clients/:id/update',
    component: UpdateClientComponent,
  },
  {
    path: 'projects',
    component: ProjectListComponent,
    pathMatch: 'full',
  },
  {
    path: 'projects/create',
    component: UpdateProjectComponent,
  },
  {
    path: 'projects/:id/update',
    component: UpdateProjectComponent,
  },
  { path: '**', pathMatch: 'full', component: ErrorComponent },
];
