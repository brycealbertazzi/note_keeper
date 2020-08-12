import { Injectable } from '@angular/core';
import { Collection } from './collection.model';
import { Note } from '../note.model';
import { NotesPage } from './notes/notes.page';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { registerLocaleData } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export interface FirebaseCollectionData {
  name: string;
  notes: Note[];
}

@Injectable({
  providedIn: 'root'
})

export class CollectionsService {
  private collections: [Collection];

  constructor(private http: HttpClient) { }

  addCollection(collection: Collection) {
    // tslint:disable-next-line: max-line-length
    let firebaseId: string;
    return this.http.post<{name: string}>(`https://note-keeper-3e377.firebaseio.com/collections.json`, { ...collection, id: null })
    .pipe(
      map(resData => {
        return this.collections.concat(collection);
      })
    );
  }

  getCollections() {
    return this.http.get<({[key: string]: FirebaseCollectionData})>(`https://note-keeper-3e377.firebaseio.com/collections.json`)
    .pipe(
      map(resData => {
        let collections = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            if (resData[key].notes === undefined || resData[key].notes === null) {
              collections.push({
                id: key,
                name: resData[key].name,
                notes: []
              });
            } else {
              collections.push({
                id: key,
                name: resData[key].name,
                notes: resData[key].notes
              });
            }
          }
        }
        return collections;
      })
    );
  }

  getSelectedCollection(id: string) {
    return this.http.get<FirebaseCollectionData>(`https://note-keeper-3e377.firebaseio.com/collections/${id}.json`)
    .pipe(
      map(resData => {
        const selectedCollection: Collection = {
          // tslint:disable-next-line: object-literal-shorthand
          id: id,
          name: resData.name,
          notes: resData.notes
        };
        return selectedCollection;
      })
    );
  }

  addNoteToCollection(selectedColId: string, noteText: string) {
    this.collections.find(c => {
      if (c.id === selectedColId) {
        const note = {
          text: noteText,
          id: Math.random() * 1000000
        };
        c.notes = [...c.notes, note];
      }
    });
  }

}
