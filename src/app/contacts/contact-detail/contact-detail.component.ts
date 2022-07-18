import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
})
export class ContactDetailComponent implements OnInit, OnDestroy {
  @Input() contact: Contact;
  id: string;
  groupContacts: Contact[] = [];
  subscription: Subscription;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.groupContacts = [];
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];

      this.subscription = this.contactService
        .getContact(this.id)
        .subscribe((contact: Contact) => {
          this.contact = contact;

          if (contact.group != null) {
            this.contact.group.map((contact) => {
              this.contactService
                .getContact(contact)
                .subscribe((contact: Contact) => {
                  this.groupContacts.push(contact);
                });
            });
          }
        });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.groupContacts = [];
  }

  onDelete() {
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['/contacts']);
  }
}
