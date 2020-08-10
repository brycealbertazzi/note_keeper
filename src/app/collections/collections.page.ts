import { Component, OnInit } from '@angular/core';
import { Collection } from './collection.model';
import { CollectionsService } from './collections.service';
import { ModalController, LoadingController } from '@ionic/angular';
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
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.loadedCollections = this.collectionsService.getCollections();
  }

  ionViewWillEnter() {
    this.loadedCollections = this.collectionsService.getCollections();
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
          const newCollection = {
            id: Math.random() * 1000000,
            name: data.collectionName,
            notes: []
          };
          this.collectionsService.addCollection(newCollection);
          this.loadedCollections = this.collectionsService.getCollections();
          setTimeout(() => loadingEl.dismiss(), 1000);
        });
      }
    });
  }

  onGetSelectedCollection(id: number) {
    this.collectionsService.getSelectedCollection(id);
  }

}
