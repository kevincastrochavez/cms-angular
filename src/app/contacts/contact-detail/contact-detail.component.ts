import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
})
export class ContactDetailComponent implements OnInit {
  @Input() contact: Contact;
  id: string;
  // groupContacts: Contact[];

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.contactService.getContact(this.id).subscribe((contact: Contact) => {
        this.contact = contact;

        this.contact.group.map((contact) => {
          // this.contactService
          //   .getContact(contact)
          console.log(this.contact.group);
        });
      });
    });
  }

  onDelete() {
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['/contacts']);
  }
}
