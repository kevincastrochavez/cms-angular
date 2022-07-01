import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    // this.maxMessageId = this.getMaxId();
  }

  // getMaxId(): number {
  //   let maxId = 0;

  //   this.messages.forEach((message) => {
  //     const currentId = +message.id;

  //     if (currentId > maxId) {
  //       maxId = currentId;
  //     }
  //   });

  //   return maxId;
  // }

  getMessages() {
    this.http.get<Message[]>('http://localhost:3000/messages').subscribe(
      (messages: Message[]) => {
        this.messages = messages;

        // this.maxMessageId = this.getMaxId();
        this.messageChangedEvent.next(this.messages.slice());
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  storeMessages() {
    const messages = JSON.stringify(this.messages);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .put('http://localhost:3000/messages', messages, { headers: headers })
      .subscribe(() => {
        this.messageChangedEvent.next(this.messages.slice());
      });
  }

  getMessage(id: string) {
    return this.messages.find((message) => message.id === id);
  }

  addMessage(newMessage: Message) {
    console.log('Hi');
    console.log(`Inserting new message: ${newMessage}`);
    if (!newMessage) return;

    newMessage.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post<{ message: string; document: Message }>(
        'http://localhost:3000/messages',
        newMessage,
        { headers: headers }
      )
      .subscribe((responseData) => {
        this.messages.push(responseData.document);
        // this.sortAndSend();
      });
  }
}
