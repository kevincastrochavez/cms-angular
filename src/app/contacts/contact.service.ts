import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactChangedEvent = new Subject<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>();
  private contacts: Contact[] = [];
  maxContactId: number;

  constructor(private http: HttpClient) {
    this.getContacts();
  }

  getContacts() {
    this.http.get<Contact[]>('http://localhost:3000/contacts').subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;

        this.contacts.sort((a, b) =>
          a.name > b.name ? 1 : a.name < b.name ? -1 : 0
        );
        this.contactChangedEvent.next(this.contacts.slice());
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getContact(id: string) {
    return this.http.get<Contact>(`http://localhost:3000/contacts/${id}`);
  }

  deleteContact(contact: Contact) {
    const position = this.contacts.findIndex((c) => c.id === contact.id);

    // this.contacts.splice(position, 1);
    return this.http
      .delete(`http://localhost:3000/contacts/${contact.id}`)
      .subscribe((response) => {
        this.contacts.splice(position, 1);
      });
  }

  addContact(newContact: Contact) {
    if (!newContact) return;

    newContact.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post<{ message: string; document: Contact }>(
        'http://localhost:3000/contacts',
        newContact,
        { headers: headers }
      )
      .subscribe((responseData) => {
        this.contacts.push(responseData.document);
      });
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) return;

    const position = this.contacts.indexOf(originalContact);

    if (position < 0) return;

    newContact.id = originalContact.id;
    this.contacts[position] = newContact;
  }
}
