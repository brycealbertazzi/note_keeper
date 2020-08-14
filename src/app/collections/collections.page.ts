import { Component, OnInit } from '@angular/core';
import { Collection } from './collection.model';
import { CollectionsService } from './collections.service';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { CollectionsModalComponent } from './collections-modal/collections-modal.component';


@Component({
  selector: 'app-collections',
  templateUrl: './collections.page.html',
  styleUrls: ['./collections.page.scss'],
})
export class CollectionsPage implements OnInit {
  loadedCollections: Collection[];

  constructor(
    private collectionsService: CollectionsService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.collectionsService.getCollectionsFromFirebase().subscribe(collections => {
      this.loadedCollections = collections;
    });
  }

  ionViewWillEnter() {
    this.collectionsService.getCollectionsFromFirebase().subscribe(collections => {
      this.loadedCollections = collections;
    });
  }

  onAddCollection() {
    this.modalCtrl.create({
      component: CollectionsModalComponent
    }).then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss();
    }).then(resultData => {
      // Called after the modal is dismissed
      if (resultData.role === 'confirm') {
        this.loadingCtrl.create({message: 'Creating collection...'})
        .then(loadingEl => {
          loadingEl.present();
          const data = resultData.data.collectionData;
          const newCollection: Collection = {
            id: JSON.stringify(Math.random() * 1000000),
            name: data.collectionName,
            notes: []
          };
          this.collectionsService.addCollectionToFirebase(newCollection.name, newCollection.notes).subscribe(() => {
            this.collectionsService.getCollectionsFromFirebase().subscribe(collections => {
              setTimeout(() => {
                loadingEl.dismiss();
                this.loadedCollections = collections;
              }, 500);
            });
          });
        });
      }
    });
  }

  onDeleteCollection(collectionId: string) {
    this.alertCtrl.create({
      header: 'Delete Collection',
      message: 'Are you sure you want to delete this collection? You cannot undo this action.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          role: 'confirm',
          handler: () => {
            this.loadingCtrl.create({message: 'Deleting collection...'}).then(loadingEl => {
              loadingEl.present();
            });
            this.collectionsService.deleteCollectionFromFirebase(collectionId).subscribe(() => {
              setTimeout(() => {
                this.loadingCtrl.dismiss();
                window.location.reload();
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
