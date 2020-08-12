import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CollectionsService } from '../../collections.service';
import { Router } from '@angular/router';
import { Collection } from '../../collection.model';
import { NotesPage } from '../notes.page';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.page.html',
  styleUrls: ['./add-note.page.scss'],
})
export class AddNotePage implements OnInit {
  @ViewChild('form', {static: true}) form: NgForm;
  currentCollection: Collection;

  constructor(private collectionsService: CollectionsService, private router: Router, private notesPage: NotesPage) { }

  ngOnInit() {
  }

  onAddNote() {
    if (this.form.invalid) {
      return;
    }
    this.currentCollection = this.notesPage.currentCollection;
    this.collectionsService.addNoteToCollection(this.currentCollection.id, this.form.value['note-text']);
    this.router.navigateByUrl('/collections/notes');
  }

}
