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
  id: string;
  title: string;
  notes: Note[];

  constructor(
    private collectionsService: CollectionsService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('collectionId')) {
        this.navCtrl.navigateBack('/collections');
        return;
      }
      this.collectionsService.getSelectedCollectionFromFirebase(paramMap.get('collectionId')).subscribe(collection => {
        this.currentCollection = collection;
        this.id = this.currentCollection.id;
        this.title = this.currentCollection.name;
        this.notes = this.currentCollection.notes;
      }, error => {
        console.log('Could not fetch collection!' + error);
      });
    });
  }

}
