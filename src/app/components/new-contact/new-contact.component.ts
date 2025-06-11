import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ContactsService } from '../../shared/services/contacts.service';
import { ContactModel } from '../../shared/models/contact.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgxMaskDirective],
  providers: [provideNgxMask()],
})
export class NewContactComponent implements OnDestroy {
  form!: FormGroup;

  private _fb = inject(FormBuilder);
  private _contactsService = inject(ContactsService);
  private _router = inject(Router);

  constructor() {
    this.form = this._fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.email],
    });
  }

  addNewContact() {
    const contact: ContactModel = {
      name: this.form.value.name,
      phone: this.form.value.phone,
      email: this.form.value.email || '',
    };
    this._contactsService.addNewContact(contact);
    Swal.fire({
      icon: 'success',
      title: 'Contato adicionado com sucesso!',
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      this._router.navigate(['/contacts']);
    });
  }

  ngOnDestroy(): void {
    this.form.reset(' ');
  }
}
