import { Component, OnInit } from '@angular/core';
import { CollectionsService } from '../collections.service';
import { Collection } from '../collection.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, IonItemSliding, AlertController, LoadingController } from '@ionic/angular';
import { Note } from 'src/app/note.model';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {
  currentCollection: Collection;
  collectionId: string;
  title: string;
  notes: Note[];

  constructor(
    private collectionsService: CollectionsService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private notesService: NotesService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('collectionId')) {
        this.navCtrl.navigateBack('/collections');
        return;
      }
      this.collectionsService.getSelectedCollectionFromFirebase(paramMap.get('collectionId')).subscribe(collection => {
        this.currentCollection = collection;
        this.collectionId = this.currentCollection.id;
        this.title = this.currentCollection.name;
        this.notes = this.currentCollection.notes;
      }, error => {
        console.log('Could not fetch collection!' + error);
      });
    });
  }

  onViewNote(note: Note) {
    this.notesService.setSelectedNote(note);
    this.router.navigate(['/', 'collections', this.collectionId, 'view-note', note.id]);
  }

  onEditNote(note: Note, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.notesService.setSelectedNote(note);
    this.router.navigate(['/', 'collections', this.collectionId, 'edit-note', note.id]);
  }

  onDeleteNote(noteId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.alertCtrl.create({
      header: 'Delete Note',
      message: 'Are you sure you want to delete this note? You cannot undo this action.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          role: 'confirm',
          handler: () => {
            this.loadingCtrl.create({message: 'Deleting note...'}).then(loadingEl => {
              loadingEl.present();
            });
            // Pass in the current collection id and the note id
            this.collectionsService.deleteNoteFromFirebase(noteId, this.collectionId).subscribe(() => {
              setTimeout(() => {
                this.loadingCtrl.dismiss();
                window.location.reload();
                this.router.navigate(['/', 'collections', this.collectionId]);
              }, 500);
            });
          }
        }
      ]
    }).then(alertEl => {
      alertEl.present();
    });
  }

}
