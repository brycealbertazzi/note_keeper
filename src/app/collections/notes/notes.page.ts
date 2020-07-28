import { Component, OnInit } from '@angular/core';
import { CollectionsService } from '../collections.service';
import { Collection } from '../collection';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {

  notesCollection: Collection;

  constructor(private collectionsService: CollectionsService) { }

  ngOnInit() {
    this.notesCollection = this.collectionsService.selectedCollection;
  }

}