import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ContactsService } from '../../shared/services/contacts.service';
import { ContactModel } from '../../shared/models/contact.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./contacts-list.component.scss'],
})
export class ContactsListComponent implements OnInit {
  contactsService = inject(ContactsService);
  allContacts!: ContactModel[] | null;
  private _router = inject(Router);

  

  ngOnInit(): void {
    this.allContacts = this.contactsService.contacts;
  }


  navigateToNewContact() {
    this._router.navigate(['/new-contact']);
  }

}
