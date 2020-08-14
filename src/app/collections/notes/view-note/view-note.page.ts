import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/note.model';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-view-note',
  templateUrl: './view-note.page.html',
  styleUrls: ['./view-note.page.scss'],
})
export class ViewNotePage implements OnInit {
  viewedNote: Note;

  constructor(private notesService: NotesService) { }

  ngOnInit() {
    this.viewedNote = this.notesService.selectedNote;
  }


}
