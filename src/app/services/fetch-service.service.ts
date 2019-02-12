import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FetchService {
  contactsUrl = 'https://jsonplaceholder.typicode.com/users';
  constructor(private http: HttpClient) {}
  postHeader = new HttpHeaders({
    'Content-type': 'application/json',
  });

  getContacts() {
    console.log(this.postHeader);
    return this.http.get<Contact[]>(this.contactsUrl);
  }

  sendContact(contact) {
    return this.http.post(this.contactsUrl, contact, { headers: this.postHeader });
  }

  deleteContact(id: number) {
    return this.http.delete(`${this.contactsUrl}/${id}`, { headers: this.postHeader });
  }

  updateContact(contact) {
    return this.http.put(`${this.contactsUrl}/${contact.id}`, contact, {
      headers: this.postHeader,
    });
  }
}
