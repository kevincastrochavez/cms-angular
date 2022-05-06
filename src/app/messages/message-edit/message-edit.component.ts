import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subject!: ElementRef;
  @ViewChild('msgText') msgText!: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender: string = 'Kevin';

  constructor() {}

  ngOnInit(): void {}

  onSendMessage() {
    const subjectInput = this.subject.nativeElement.value;
    const msgTextInput = this.msgText.nativeElement.value;

    const newMsg = new Message(
      '1',
      subjectInput,
      msgTextInput,
      this.currentSender
    );

    this.addMessageEvent.emit(newMsg);
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }

  onClear() {
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }
}
