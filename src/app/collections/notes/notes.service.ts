import { Injectable } from '@angular/core';
import { Note } from 'src/app/note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private _selectedNote: Note;

  constructor() { }

  get selectedNote() {
    return {...this._selectedNote};
  }

  setSelectedNote(note: Note) {
    this._selectedNote = note;
  }

}
