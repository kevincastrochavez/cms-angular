import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Message } from './message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();
  messages: Message[];
  maxMessageId: number;

  constructor(private http: HttpClient) {}

  getMessages() {
    this.http.get<Message[]>('http://localhost:3000/messages').subscribe(
      (messages: Message[]) => {
        this.messages = messages;

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

  addMessage(newMessage: Message) {
    if (!newMessage) return;

    newMessage.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post<{ postMessage: string; message: Message }>(
        'http://localhost:3000/messages',
        newMessage,
        { headers: headers }
      )
      .subscribe((responseData) => {
        this.messages.push(responseData.message);
      });
  }
}
