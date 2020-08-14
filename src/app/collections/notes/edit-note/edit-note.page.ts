import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Collection } from '../../collection.model';
import { Note } from 'src/app/note.model';
import { LoadingController } from '@ionic/angular';
import { CollectionsService } from '../../collections.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.page.html',
  styleUrls: ['./edit-note.page.scss'],
})
export class EditNotePage implements OnInit {
  @ViewChild('form', {static: true}) form: NgForm;

  currentCollection: Collection;
  collectionId: string;
  noteId: string;
  editedNote: Note;
  maxLength: number;
  maxLimit = false;

  constructor(
    private loadingCtrl: LoadingController,
    private router: Router,
    private collectionsService: CollectionsService,
    private activatedRoute: ActivatedRoute,
    private notesService: NotesService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('noteId')) {
        return;
      }
      this.currentCollection = this.collectionsService.selectedCollection;
      this.collectionId = this.currentCollection.id;
      this.noteId = paramMap.get('noteId');
      this.editedNote = this.notesService.selectedNote;
      this.maxLength = 1800 - this.editedNote.text.length;
      if (this.editedNote.text.length >= 1800) {
        this.maxLimit = true;
      }
    });
  }

  onEditNote() {
    if (this.form.invalid) {
      return;
    }
    this.loadingCtrl.create({message: 'Editing note...'}).then(loadingEl => {
      loadingEl.present();
    });
    // tslint:disable-next-line: max-line-length
    this.collectionsService.editNoteFromFirebase(this.collectionsService.selectedCollection.id, this.noteId, this.editedNote.text + this.form.value['note-text']).subscribe(() => {
      setTimeout(() => {
        this.loadingCtrl.dismiss();
        this.router.navigate(['/', 'collections', this.collectionId]);
      }, 500);
    });
  }

  onTextEnter() {
    if (this.editedNote.text.length + this.form.value['note-text'].length >= 1800) {
      this.maxLimit = true;
    } else {
      this.maxLimit = false;
    }
    console.log(this.editedNote.text.length + this.form.value['note-text'].length, this.maxLimit);
  }

}
