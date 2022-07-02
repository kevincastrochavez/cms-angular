import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Contact } from 'src/app/contacts/contact.model';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subject!: ElementRef;
  @ViewChild('msgText') msgText!: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender: Contact;

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {
    this.http
      .get<Contact>(`http://localhost:3000/contacts/62bf8ab64fe011e5b27f24a0`)
      .subscribe((contact: Contact) => {
        this.currentSender = contact;
      });
  }

  ngOnInit(): void {}

  onSendMessage() {
    const subjectInput = this.subject.nativeElement.value;
    const msgTextInput = this.msgText.nativeElement.value;

    const newMsg = new Message(
      '1',
      subjectInput,
      msgTextInput,
      this.currentSender,
      null
    );

    this.messageService.addMessage(newMsg);

    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }

  onClear() {
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }
}
