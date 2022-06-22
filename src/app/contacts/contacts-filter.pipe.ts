import { Pipe, PipeTransform } from '@angular/core';

import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter',
})
export class ContactsFilterPipe implements PipeTransform {
  transform(contacts: Contact[], term) {
    let contactsArray: Contact[] = [];

    if (term && term.length > 0) {
      contactsArray = contacts.filter((contact: Contact) =>
        contact.name.toLowerCase().includes(term.toLowerCase())
      );
    }

    if (contactsArray.length < 1) {
      return contacts;
    }

    return contactsArray;
  }
}
