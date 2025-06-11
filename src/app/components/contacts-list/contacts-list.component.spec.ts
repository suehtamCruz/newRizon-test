import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactsListComponent } from './contacts-list.component';
import { ContactsService } from '../../shared/services/contacts.service';
import { Router } from '@angular/router';
import { ContactModel } from '../../shared/models/contact.model';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';

jest.mock('sweetalert2', () => ({
  fire: jest.fn().mockResolvedValue({ isConfirmed: true }),
}));

describe('ContactsListComponent', () => {
  let component: ContactsListComponent;
  let fixture: ComponentFixture<ContactsListComponent>;
  let contactsService: jest.Mocked<ContactsService>;
  let router: jest.Mocked<Router>;

  const mockContacts: ContactModel[] = [
    { name: 'John Doe', phone: '11999999999', email: 'john@example.com' },
    { name: 'Jane Doe', phone: '11988888888', email: 'jane@example.com' },
  ];

  beforeEach(async () => {
    const contactsServiceMock = {
      contacts: mockContacts,
      removeContact: jest.fn(),
      addNewContact: jest.fn(),
    };

    const routerMock = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ContactsListComponent, MatIconModule],
      providers: [
        { provide: ContactsService, useValue: contactsServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactsListComponent);
    component = fixture.componentInstance;
    contactsService = TestBed.inject(
      ContactsService
    ) as jest.Mocked<ContactsService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load contacts on init', () => {
    component.ngOnInit();
    expect(component.allContacts).toEqual(mockContacts);
  });

  it('should navigate to new contact page', () => {
    component.navigateToNewContact();
    expect(router.navigate).toHaveBeenCalledWith(['/new-contact']);
  });

  describe('removeContact', () => {
    const contactToRemove = mockContacts[0];

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should show confirmation dialog when removing contact', async () => {
      await component.removeContact(contactToRemove);

      expect(Swal.fire).toHaveBeenCalledWith({
        title: 'Tem certeza?',
        text: 'Você não poderá reverter isso!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, excluir!',
      });
    });

    it('should remove contact when confirmed', async () => {
      await component.removeContact(contactToRemove);

      expect(contactsService.removeContact).toHaveBeenCalledWith(
        contactToRemove
      );
      expect(Swal.fire).toHaveBeenCalledWith(
        'Excluído!',
        'O contato foi excluído com sucesso.',
        'success'
      );
    });

    it('should not remove contact when confirmation is canceled', async () => {
      (Swal.fire as jest.Mock).mockResolvedValueOnce({ isConfirmed: false });

      await component.removeContact(contactToRemove);

      expect(contactsService.removeContact).not.toHaveBeenCalled();
    });
  });
});
