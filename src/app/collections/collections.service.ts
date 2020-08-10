import { Injectable } from '@angular/core';
import { Collection } from './collection.model';
import { Note } from '../note.model';
import { NotesPage } from './notes/notes.page';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {

  private collections: Collection[] = [
    {
      id: 1,
      name: 'c1',
      notes: [
        {
          text: 'note 1note 1note 1note 1note 1note 1note 1note 1note 1note 1note 1note 1note 1note 1note 1note 1note 1note 1note 1note 1note 1note 1note 1note 1note 1note 1note 1note 1note 1note 1note 1',
          id: 1
        },
        {
          text: 'note 2',
          id: 2
        }
      ]
    },
    {
      id: 2,
      name: 'c2',
      notes: [
        {
          text: 'note 3',
          id: 1
        },
        {
          text: 'note 4',
          id: 2
        }
      ]
    },
    {
      id: 3,
      name: 'c3',
      notes: [
        {
          text: 'note 5',
          id: 1
        },
        {
          text: 'note 6',
          id: 2
        }
      ]
    }
  ];

  selectedCollection: Collection;

  constructor() { }

  addCollection(collection: Collection) {
    this.collections = [...this.collections, collection];
  }

  getCollections() {
    return [...this.collections];
  }

  getSelectedCollection(id: number) {
    this.selectedCollection = this.collections.find(c => c.id === id);
  }

  addNoteToCollection(selectedColId: number, noteText: string) {
    this.collections.find(c => {
      if (c.id === selectedColId) {
        const note = {
          text: noteText,
          id: Math.random() * 1000000
        };
        c.notes = [...c.notes, note];
        console.log(c.notes);
      }
    });
    console.log(this.getCollections());
  }

}
