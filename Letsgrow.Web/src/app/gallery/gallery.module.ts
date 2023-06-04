import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from './gallery.component';
import { GalleryService } from './gallery.service';
import { RouterModule } from '@angular/router';
const routes = [
  {
    path: '',
    component: GalleryComponent,
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [GalleryComponent],
  exports: [],
  providers: [GalleryService],
})
export class GalleryModule {}
