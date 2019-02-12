import { Component, OnInit } from '@angular/core';
import { Contact } from '../../models/contact';
import { FetchService } from '../../services/fetch-service.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.sass'],
})
export class ContactsComponent implements OnInit {
  showForm: boolean = false;
  isEdited: boolean = false;
  isLoaded: boolean = false;
  searchMode: boolean = false;
  filteredForSearchContacts;
  showAbout: boolean = false;
  currentContact = {
    id: 0,
    name: '',
    phone: '',
    email: '',
    address: {
      street: '',
      city: '',
    },
  };
  contacts;

  constructor(private fetchService: FetchService) {}

  ngOnInit() {
    this.fetchService.getContacts().subscribe(contacts => {
      this.isLoaded = true;
      this.contacts = contacts;
    });
  }

  showFormFunc(value: boolean) {
    this.showForm = value;
    this.currentContact = {
      id: 0,
      name: '',
      phone: '',
      email: '',
      address: {
        street: '',
        city: '',
      },
    };
  }
  deleteContact(id: number) {
    this.fetchService.deleteContact(id).subscribe(() => {
      this.contacts = this.contacts.filter(contact => contact.id !== id);
    });
    if (this.searchMode) {
      this.filteredForSearchContacts = this.filteredForSearchContacts.filter(
        contact => contact.id !== id,
      );
    }
  }

  addContact(contact) {
    this.fetchService.sendContact(contact).subscribe(res => {
      this.contacts.unshift(res);
      this.currentContact = {
        id: 0,
        name: '',
        phone: '',
        email: '',
        address: {
          street: '',
          city: '',
        },
      };
    });
  }

  editContact(id: number) {
    this.currentContact = this.contacts.filter(contact => contact.id === id).pop();
  }

  updateContact(contact) {
    this.fetchService.updateContact(contact).subscribe(res => {
      this.currentContact = {
        id: 0,
        name: '',
        phone: '',
        email: '',
        address: {
          street: '',
          city: '',
        },
      };
    });
  }

  searchContact(searchQuery: string) {
    this.filteredForSearchContacts = this.contacts.filter(contact => {
      return (
        new RegExp(searchQuery, 'ig').test(contact.name) ||
        new RegExp(searchQuery, 'ig').test(contact.phone) ||
        new RegExp(searchQuery, 'ig').test(contact.email) ||
        new RegExp(searchQuery, 'ig').test(contact.address.street) ||
        new RegExp(searchQuery, 'ig').test(contact.address.city)
      );
    });
  }
}
