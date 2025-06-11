import { Injectable, signal } from '@angular/core';
import { ContactModel } from '../models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private _contacts = signal<ContactModel[]>([]);

  get contacts() {
    return this._contacts();
  }

  addNewContact(contact: ContactModel) {
    this._contacts.update((contacts) => [...contacts, contact]);
  }

  removeContact(contact: ContactModel) {
    this._contacts.update((contacts) => {
      const index = contacts.findIndex(
        (c) => c.name.trim().toLowerCase() === contact.name.trim().toLowerCase()
      );
      contacts.splice(index, 1);
      return contacts;
    });
  }
}
