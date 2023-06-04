import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GalleryService } from './gallery.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<void>;

  imgSrc: any =[];

  plants: any;

  constructor(public galleryService: GalleryService) {
    this._unsubscribeAll = new Subject<void>();
  }

  ngOnInit() {
    this.getAllPlants();

  }

  getAllPlants() {
    let json = {
      callFor: 'Plants',
    };

    this.galleryService
      .getAllPlants(json)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: []) => {
        if (response) {
          this.plants = response;
          this.plants.forEach((plant:any)=>{

            this.getPlantsImage(plant);

         });

        } else {
        }
      });
  }

  getPlantsImage(plant: any) {
    const imgObj :any ={
      imgUrl:"",
      plantId :plant?.plantId,
      name :plant?.name,
      description:plant?.description,
      note : plant?.note
    };

    imgObj.imgUrl =this.galleryService.getImagesFromRepo(plant.plantId);

    this.imgSrc.push(imgObj);
console.log("asmita",this.imgSrc);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
