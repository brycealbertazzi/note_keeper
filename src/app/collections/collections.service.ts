import { Injectable } from '@angular/core';
import { Collection } from './collection.model';
import { Note } from '../note.model';
import { NotesPage } from './notes/notes.page';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { registerLocaleData } from '@angular/common';
import { BehaviorSubject, pipe } from 'rxjs';

export interface FirebaseCollectionData {
  name: string;
  notes: Note[];
}

@Injectable({
  providedIn: 'root'
})

export class CollectionsService {
  // tslint:disable-next-line: variable-name
  private _collections: Collection[];
  // tslint:disable-next-line: variable-name
  private _selectedCollection: Collection;

  constructor(private http: HttpClient) { }

  addCollection(name: string, notes: Note[]) {
    // tslint:disable-next-line: max-line-length
    const newCollection = {
      id: null,
      name,
      notes
    };
    return this.http.post(`https://note-keeper-3e377.firebaseio.com/collections.json`, { ...newCollection, id: null });
  }

  get selectedCollection() {
    return {...this._selectedCollection};
  }

  get collections() {
    return [...this._collections];
  }

  getCollectionsFromFirebase() {
    return this.http.get<({[key: string]: FirebaseCollectionData})>(`https://note-keeper-3e377.firebaseio.com/collections.json`)
    .pipe(
      map(resData => {
        let c = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            if (resData[key].notes === undefined || resData[key].notes === null) {
              c.push({
                id: key,
                name: resData[key].name,
                notes: []
              });
            } else {
              c.push({
                id: key,
                name: resData[key].name,
                notes: resData[key].notes
              });
            }
          }
        }
        this._collections = c;
        return c;
      })
    );
  }

  getSelectedCollectionFromFirebase(id: string) {
    return this.http.get<FirebaseCollectionData>(`https://note-keeper-3e377.firebaseio.com/collections/${id}.json`)
    .pipe(
      map(resData => {
        const currSelectedCollection: Collection = {
          // tslint:disable-next-line: object-literal-shorthand
          id: id,
          name: resData.name,
          notes: resData.notes
        };
        if (currSelectedCollection.notes === null || currSelectedCollection.notes === undefined) {
          currSelectedCollection.notes = [];
        }
        this._selectedCollection = currSelectedCollection;
        return this.selectedCollection;
      })
    );
  }

  // Add a note to the selected collection
  addNoteToFirebase(id: string, noteText: string) {
    const newNote: Note = {
      id: JSON.stringify(Math.random() * 1000000),
      text: noteText
    };
    const oldCollection: Collection = this.collections.find(c => c.id === id);
    const newNotes: Note[] = [...oldCollection.notes, newNote];
    const newCollection: Collection = {
      id: null,
      name: oldCollection.name,
      notes: newNotes
    };
    // Update the collections in local storage
    this.collections.find(c => {
      if (c.id === id) {
        c.notes = newNotes;
      }
    });
    return this.http.put(`https://note-keeper-3e377.firebaseio.com/collections/${id}.json`, {...newCollection, id: null});
  }

  editNoteFromFirebase(collectionId: string, noteId: string, noteText: string) {
    const newNote: Note = {
      id: noteId,
      text: noteText
    };
    const editedCollection: Collection = this.collections.find(c => c.id === collectionId);
    editedCollection.notes.map(note => {
      if (note.id === noteId) {
        note.text = noteText;
      }
    });
    return this.http.put(`https://note-keeper-3e377.firebaseio.com/collections/${collectionId}.json`, {...editedCollection, id: null});
  }

  deleteNoteFromFirebase(noteId: string, collectionId: string) {
    const oldCollection: Collection = this.collections.find(c => c.id === collectionId);
    const newNotes: Note[] = oldCollection.notes.filter(note => note.id !== noteId);
    console.log(newNotes);
    const newCollection: Collection = {
      id: null,
      name: oldCollection.name,
      notes: newNotes
    };
    // Update the collections in local storage
    this.collections.find(c => {
      if (c.id === collectionId) {
        c.notes = newNotes;
      }
    });
    return this.http.put(`https://note-keeper-3e377.firebaseio.com/collections/${collectionId}.json`, {...newCollection, id: null});
  }

}
