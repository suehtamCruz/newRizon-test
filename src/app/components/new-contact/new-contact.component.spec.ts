import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewContactComponent } from './new-contact.component';
import { ContactsService } from '../../shared/services/contacts.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

jest.mock('sweetalert2', () => ({
  fire: jest.fn().mockResolvedValue({ isConfirmed: true }),
}));

describe('NewContactComponent', () => {
  let component: NewContactComponent;
  let fixture: ComponentFixture<NewContactComponent>;
  let contactsService: jest.Mocked<ContactsService>;
  let router: jest.Mocked<Router>;

  beforeEach(async () => {
    const contactsServiceMock = {
      addNewContact: jest.fn(),
    };

    const routerMock = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [NewContactComponent, CommonModule, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: ContactsService, useValue: contactsServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NewContactComponent);
    component = fixture.componentInstance;
    contactsService = TestBed.inject(ContactsService) as jest.Mocked<ContactsService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with an invalid form', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('should validate required fields', () => {
    const form = component.form;
    expect(form.get('name')?.errors?.['required']).toBeTruthy();
    expect(form.get('phone')?.errors?.['required']).toBeTruthy();
  });

  it('should validate email format', () => {
    const emailControl = component.form.get('email');
    emailControl?.setValue('invalid-email');
    expect(emailControl?.errors?.['email']).toBeTruthy();

    emailControl?.setValue('valid@email.com');
    expect(emailControl?.errors).toBeNull();
  });

  it('should add new contact and navigate when form is valid', async () => {
    const testContact = {
      name: 'John Doe',
      phone: '11999999999',
      email: 'john@example.com',
    };

    component.form.setValue(testContact);
    expect(component.form.valid).toBeTruthy();

    await component.addNewContact();

    expect(contactsService.addNewContact).toHaveBeenCalledWith(testContact);
    expect(Swal.fire).toHaveBeenCalledWith({
      icon: 'success',
      title: 'Contato adicionado com sucesso!',
      showConfirmButton: false,
      timer: 1500,
    });
    expect(router.navigate).toHaveBeenCalledWith(['/contacts']);
  });

  it('should reset form on destroy', () => {
    const resetSpy = jest.spyOn(component.form, 'reset');
    component.ngOnDestroy();
    expect(resetSpy).toHaveBeenCalledWith(' ');
  });
});
