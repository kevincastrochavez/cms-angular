import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css'],
})
export class ContactEditComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  invalidContact: boolean = false;
  groupContacts: Contact[] = [];
  originalContact: Contact;
  editMode: boolean;
  contact: Contact;
  id: string;

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];

      if (!this.id) {
        this.editMode = false;
        return;
      }

      this.contactService.getContact(this.id).subscribe((contact: Contact) => {
        this.originalContact = contact;

        this.form.setValue({
          name: this.originalContact.name,
          email: this.originalContact.email,
          phone: this.originalContact.phone,
          imageUrl: this.originalContact.imageUrl,
          group: this.originalContact.group,
        });

        if (this.originalContact.group) {
          this.originalContact.group.map((contact) => {
            this.contactService
              .getContact(contact)
              .subscribe((contact: Contact) => {
                this.groupContacts.push(contact);
              });
          });
        }
      });

      if (!this.originalContact) {
        return;
      }

      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const stringArray = this.groupContacts.map((contact) => contact._id);

    const newContact = new Contact(
      null,
      value.id,
      value.name,
      value.email,
      value.phone,
      value.imageUrl,
      stringArray
    );

    if (this.editMode) {
      console.log(this.editMode);
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      console.log(this.editMode);
      this.contactService.addContact(newContact);
    }

    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) {
      this.invalidContact = true;

      return true;
    }

    if (this.contact && newContact.id === this.contact.id) {
      this.invalidContact = true;

      return true;
    }

    if (this.groupContacts) {
      for (let i = 0; i < this.groupContacts.length; i++) {
        if (newContact.id === this.groupContacts[i].id) {
          this.invalidContact = true;

          return true;
        }
      }
    }

    this.invalidContact = false;

    return false;
  }

  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;

    const invalidGroupContact = this.isInvalidContact(selectedContact);
    console.log(this.invalidContact);

    if (invalidGroupContact) return;

    this.groupContacts.push(selectedContact);
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) return;

    this.groupContacts.splice(index, 1);
  }
}
