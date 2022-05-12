import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document(
      '1',
      'CIT 260 - Object Oriented Programming',
      'Description for Object Oriented Programming',
      'opp.com'
    ),
    new Document(
      '1',
      'WDD 430 - Full Stack Web Development',
      'Description for Full Stack Web Development',
      'fswd.com'
    ),
    new Document(
      '1',
      'CIT 425 - Data Warehousing',
      'Description for Data Warehousing',
      'dw.com'
    ),
    new Document(
      '1',
      'CIT 460 - Enterprise Development',
      'Description for Enterprise Development',
      'ed.com'
    ),
    new Document(
      '1',
      'CIT 495 - Senior Practicum',
      'Description for Senior Practicum',
      'sp.com'
    ),
  ];

  constructor() {}

  ngOnInit(): void {}

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
