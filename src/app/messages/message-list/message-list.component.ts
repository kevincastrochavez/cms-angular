import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message('2', 'Test', 'This is a test', 'Cindy'),
    new Message('3', 'Test 2', 'This is a test 2', 'Citlalli'),
    new Message('3', 'Test 3', 'This is a test 3', 'David'),
  ];

  constructor() {}

  ngOnInit(): void {}

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
