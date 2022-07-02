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
    // this.contacts = MOCKCONTACTS;
  }

  getContacts() {
    this.http.get<Contact[]>('http://localhost:3000/contacts').subscribe(
      (contacts: Contact[]) => {
        console.log(contacts);

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

  storeContacts() {
    const contacts = JSON.stringify(this.contacts);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .put(
        'https://cms-angular-2f945-default-rtdb.firebaseio.com/contacts.json',
        contacts,
        { headers: headers }
      )
      .subscribe(() => {
        this.contactChangedEvent.next(this.contacts.slice());
      });
  }

  getContact(id: string) {
    return this.contacts.find((contact) => contact.id === id);
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const position = this.contacts.indexOf(contact);
    if (position < 0) {
      return;
    }

    this.contacts.splice(position, 1);
    this.storeContacts();
  }

  addContact(newContact: Contact) {
    if (!newContact) return;

    this.maxContactId++;
    newContact.id = String(this.maxContactId);
    this.contacts.push(newContact);

    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) return;

    const position = this.contacts.indexOf(originalContact);

    if (position < 0) return;

    newContact.id = originalContact.id;
    this.contacts[position] = newContact;

    this.storeContacts();
  }
}
