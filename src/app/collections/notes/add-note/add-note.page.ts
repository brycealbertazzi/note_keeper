import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CollectionsService } from '../../collections.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.page.html',
  styleUrls: ['./add-note.page.scss'],
})
export class AddNotePage implements OnInit {
  @ViewChild('form', {static: true}) form: NgForm;

  constructor(private collectionsService: CollectionsService, private router: Router) { }

  ngOnInit() {
  }

  onAddNote() {
    if (this.form.invalid) {
      return;
    }
    this.collectionsService.addNoteToCollection(this.collectionsService.selectedCollection.id, this.form.value['note-text']);
    this.router.navigateByUrl('/collections/notes');
  }

}
