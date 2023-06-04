import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebApiService } from '../core/service/web.api.service';
import { AppConfig } from '../app.config';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  private _unsubscribeAll: Subject<void>;
  private basePath = AppConfig.apiUrl;

  constructor(public webApiService: WebApiService) {
    this._unsubscribeAll = new Subject<void>();
  }

  getAllPlants(json: any): Observable<any> {
    return this.webApiService.get(this.basePath + 'Gallery/GetPlant', {
      json: JSON.stringify(json),
    });
  }

  getImagesFromRepo(Id : any) {
    return this.basePath + 'Gallery/PlantImagesFromRepo/'+ Id ;
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
