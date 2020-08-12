import { Component, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CollectionsService } from '../collections.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-collections-modal',
  templateUrl: './collections-modal.component.html',
  styleUrls: ['./collections-modal.component.scss'],
})
export class CollectionsModalComponent {
  @ViewChild('form', {static: true}) form: NgForm;

  constructor(
    private modalCtrl: ModalController,
    private collectionsService: CollectionsService
  ) {}

  onCreateCollection() {
    if (this.form.invalid) {
      return;
    }
    this.modalCtrl.dismiss(
      {
        collectionData: {
          collectionName: this.form.value['collection-name']
        }
      },
      'confirm'
    );
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }

}
