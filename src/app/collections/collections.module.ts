import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CollectionsPageRoutingModule } from './collections-routing.module';

import { CollectionsPage } from './collections.page';
import { CollectionsModalComponent } from './collections-modal/collections-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CollectionsPageRoutingModule
  ],
  declarations: [CollectionsPage, CollectionsModalComponent],
  entryComponents: [CollectionsModalComponent]
})
export class CollectionsPageModule {}
