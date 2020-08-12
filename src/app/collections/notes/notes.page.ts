import { Component, OnInit } from '@angular/core';
import { CollectionsService } from '../collections.service';
import { Collection } from '../collection.model';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Note } from 'src/app/note.model';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {
  currentCollection: Collection;
  currCollectionName: string;
  currCollectionNotes: Note[] = [];

  constructor(
    private collectionsService: CollectionsService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('collectionId')) {
        this.navCtrl.navigateBack('/collections');
        console.log('returned');
        return;
      }
      this.collectionsService.getSelectedCollection(paramMap.get('collectionId')).subscribe(collection => {
        this.currentCollection = collection;
        this.currCollectionName = collection.name;
        if (!(collection.notes === undefined || collection.notes === null)) {
          // If we have at least 1 note
          this.currCollectionNotes = collection.notes;
        }
      }, error => {
        console.log("Could not fetch collection!" + error);
      });
    });
  }


  addNote(note: string) {
    console.log(note);
  }

}
