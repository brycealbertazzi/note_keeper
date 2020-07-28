import { Component, Input, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CollectionsService } from '../collections.service';

@Component({
  selector: 'app-collections-modal',
  templateUrl: './collections-modal.component.html',
  styleUrls: ['./collections-modal.component.scss'],
})
export class CollectionsModalComponent {

  collectionName: string;

  constructor(private modalController: ModalController,
              private collectionsService: CollectionsService) {}

  async closeModal() {
    this.collectionsService.addCollection({
      id: Math.random() * (1000000000),
      name: this.collectionName,
      notes: []
    });
    console.log(this.collectionName);
    await this.modalController.dismiss();
  }

}
