import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ContactsService } from '../../shared/services/contacts.service';
import { ContactModel } from '../../shared/models/contact.model';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  standalone: true,
  imports: [CommonModule, MatIconModule],
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

  removeContact(contact: ContactModel) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.contactsService.removeContact(contact);
        this.allContacts = this.contactsService.contacts;
        Swal.fire('Excluído!', 'O contato foi excluído com sucesso.', 'success');
      }
    });
  }
}
