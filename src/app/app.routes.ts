import { Routes } from '@angular/router';
import { NewContactComponent } from './components/new-contact/new-contact.component';
import { ContactsListComponent } from './components/contacts-list/contacts-list.component';

export const routes: Routes = [
  {
    path: 'contacts',
    component: ContactsListComponent
  },
  {
    path: 'new-contact',
    component: NewContactComponent,
  },
  {
    path: '',
    redirectTo: 'contacts',
    pathMatch: 'full',
  },
];
