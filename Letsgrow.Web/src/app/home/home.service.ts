import { Injectable, OnDestroy } from '@angular/core';
import {  Observable, Subject } from 'rxjs';
import { AppConfig } from '../app.config';
import { WebApiService } from '../core/service/web.api.service';


@Injectable({
  providedIn: 'root',
})
export class HomeService implements OnDestroy {
  private _unsubscribeAll: Subject<void>;
  private basePath = AppConfig.apiUrl;

  constructor(public webApiService: WebApiService) {
    this._unsubscribeAll = new Subject<void>();
  }

  getUsers(json: any): Observable<any> {
    return this.webApiService.get(this.basePath + 'User/GetUser', {
      json: json,
    });
  }

  getAllPlants(json: any): Observable<any> {
    return this.webApiService.get(this.basePath + 'Gallery/GetPlant', {
      json: json,
    });
  }

  createUser(json: any): Observable<any> {
    return this.webApiService.post(
      this.basePath + 'User/CreateUser',
    json
    );
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
