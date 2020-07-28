import { Component, OnInit } from '@angular/core';
import { Collection } from './collection';
import { CollectionsService } from './collections.service';
import { ModalController } from '@ionic/angular';
import { CollectionsModalComponent } from './collections-modal/collections-modal.component';


@Component({
  selector: 'app-collections',
  templateUrl: './collections.page.html',
  styleUrls: ['./collections.page.scss'],
})
export class CollectionsPage implements OnInit {
  loadedCollections: Collection[];

  constructor(private collectionsService: CollectionsService, private modalController: ModalController) { }

  ngOnInit() {
    this.loadedCollections = this.collectionsService.getCollections();
  }

  ionViewDidEnter() {
    this.loadedCollections = this.collectionsService.getCollections();
    console.log(this.loadedCollections);
  }

  onAddCollection() {
    this.presentModal();
  }

  onGetSelectedCollection(id: number) {
    this.collectionsService.getSelectedCollection(id);
    console.log(this.collectionsService.selectedCollection);
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: CollectionsModalComponent
    });
    await modal.present();
    const {data} = await modal.onDidDismiss();
    console.log(data);
    this.updateCollections();
  }

  updateCollections() {
    this.loadedCollections = this.collectionsService.getCollections();
  }

}
