import { Injectable } from '@angular/core';
import { Collection } from './collection';
import { Note } from '../note';

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
          text: 'note 1note 1note 1note 1note 1note 1note 1note 1note 1note 1note 1note 1note 1note 1note 1note 1note 1note 1note 1note 1note 1note 1note 1note 1note 1note 1note 1note 1note 1note 1note 1'
        },
        {
          text: 'note 2'
        }
      ]
    },
    {
      id: 2,
      name: 'c2',
      notes: [
        {
          text: 'note 3'
        },
        {
          text: 'note 4'
        }
      ]
    },
    {
      id: 3,
      name: 'c3',
      notes: [
        {
          text: 'note 5'
        },
        {
          text: 'note 6'
        }
      ]
    }
  ];

  selectedCollection: Collection;

  constructor() { }

  addCollection(collection: Collection) {
    this.collections = [...this.collections].concat(collection);
    console.log(this.getCollections());
  }

  getCollections() {
    return [...this.collections];
  }

  getSelectedCollection(id: number) {
    this.selectedCollection = this.collections.find(c => c.id === id);
  }

}
