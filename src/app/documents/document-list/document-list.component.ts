import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Document[] = [];
  private subscription: Subscription;

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();

    // this.documentService.documentChangedEvent.subscribe(
    //   (documents: Document[]) => {
    //     this.documents = documents;
    //   }
    // );

    this.subscription = this.documentService.documentListChangedEvent.subscribe(
      (documentList: Document[]) => {
        this.documents = documentList;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
