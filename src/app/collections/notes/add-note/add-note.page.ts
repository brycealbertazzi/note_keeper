import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CollectionsService } from '../../collections.service';
import { Router } from '@angular/router';
import { Collection } from '../../collection.model';
import { LoadingController } from '@ionic/angular';
import { Note } from 'src/app/note.model';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.page.html',
  styleUrls: ['./add-note.page.scss'],
})
export class AddNotePage implements OnInit {
  @ViewChild('form', {static: true}) form: NgForm;
  currentCollection: Collection;
  id: string;
  title: string;
  notes: Note[];

  constructor(
    private collectionsService: CollectionsService,
    private loadingCtrl: LoadingController,
    private router: Router
  ) { }

  ngOnInit() {
     this.currentCollection = this.collectionsService.selectedCollection;
     this.id = this.currentCollection.id;
  }

  onAddNote() {
    if (this.form.invalid) {
      return;
    }
    this.loadingCtrl.create({message: 'Creating note...'}).then(loadingEl => {
      loadingEl.present();
    });
    // tslint:disable-next-line: max-line-length
    this.collectionsService.addNoteToFirebase(this.collectionsService.selectedCollection.id, this.form.value['note-text']).subscribe(() => {
      this.loadingCtrl.dismiss();
      this.router.navigate(['/', 'collections', this.id]);
    });
  }

}
