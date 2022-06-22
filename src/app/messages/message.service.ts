import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();
  messages: Message[] = [];
  maxMessageId: number;

  constructor(private http: HttpClient) {
    this.messages = MOCKMESSAGES;
    this.maxMessageId = this.getMaxId();
  }

  getMaxId(): number {
    let maxId = 0;

    this.messages.forEach((message) => {
      const currentId = +message.id;

      if (currentId > maxId) {
        maxId = currentId;
      }
    });

    return maxId;
  }

  getMessages() {
    this.http
      .get<Message[]>(
        'https://cms-angular-2f945-default-rtdb.firebaseio.com/messages.json'
      )
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          this.messageChangedEvent.next(this.messages.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getMessage(id: string) {
    return this.messages.find((message) => message.id === id);
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.messageChangedEvent.emit(this.messages.slice());
  }
}
