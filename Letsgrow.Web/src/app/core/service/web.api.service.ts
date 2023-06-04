
import { throwError as observableThrowError, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { catchError, finalize, map } from 'rxjs/operators';

import { Router } from '@angular/router';
import { AppHttpOptions } from '../models/http-options.model';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class WebApiService {
  @BlockUI() blockUI: NgBlockUI | any;

  constructor(
    public http: HttpClient,
    private router: Router

  ) {
  }

  // used for fetching and uploading files for email attachment
  public getBlob(url: string, params?: any, toastMessage?: string, blockUI?: boolean): Observable<Blob> {
    return this.http.get(url, { params: params, responseType: 'blob' }).pipe(
      map(response => {
        return new Blob([response]);
      })
    );
  }

  public getImage(url: string): Observable<any> {

    return Observable.create((observer: any) => {
      const req = new XMLHttpRequest();
      req.open('get', url);
      req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
          observer.next(req.response);
          observer.complete();
        }
      };

      req.send();
    });
  }

  public get<T>(url: string, params?: any, toastMessage?: string, showBlockUI: boolean = true, showDefaultToaster: boolean = true, showErrorMessage: boolean = true): Observable<T> {
    if (showBlockUI) {
      this.blockUI.start();
    }

    return this.http.get<T>(url, { params: params }).pipe(
      map(data => this.unwrapHttpValue(data)),
      catchError((error: any) => {
        if (showErrorMessage) {
          this.errorMessage(error, showDefaultToaster);
        }
        return observableThrowError(this.unwrapHttpValue(error));
      }),
      finalize(() => {
        if (showBlockUI) {
          this.blockUI.stop();
        }
      })
    );
  }

  public getWithOptions<T>(url: string, options?: AppHttpOptions, showBlockUI: boolean = true): Observable<T> {
    if (showBlockUI) {
      this.blockUI.start();
    }

    return this.http.get<T>(url, options).pipe(
      map(data => {
        if (options && options.notCamalizedJson) {
          return data;
        } else {
          return this.unwrapHttpValue(data);
        }
      }),
      catchError((error: any) => {
        this.errorMessage(error);
        return observableThrowError(this.unwrapHttpValue(error));
      }),
      finalize(() => {
        if (showBlockUI) {
          this.blockUI.stop();
        }
      })
    );
  }

  public post<T>(url: string, data?: any, params?: any, toastMessage?: string, showBlockUI: boolean = true): Observable<T> {
    if (showBlockUI) {
      this.blockUI.start();
    }

    // for removing space of data when data is not null
    if (data != null) {
      data = JSON.stringify(data).replace(/"\s+|\s+"/g, '"');
      data = JSON.parse(data);
    }

    return this.http.post<T>(url, data).pipe(
      map(res => this.unwrapHttpValue(res)),
      catchError((error: any) => {
        this.errorMessage(error);
        return observableThrowError(this.unwrapHttpValue(error));
      }),
      finalize(() => {
        if (showBlockUI) {
          this.blockUI.stop();
        }
      })
    );
  }

  public postWithOptions<T>(url: string, body: any, options?: AppHttpOptions, showBlockUI: boolean = true): Observable<T> {
    if (showBlockUI) {
      this.blockUI.start();
    }
    return this.http.post<T>(url, body, options).pipe(
      map(data => {
        if (options && options.notCamalizedJson) {
          return data;
        } else {
          return this.unwrapHttpValue(data);
        }
      }),
      catchError((error: any) => {
        this.errorMessage(error);
        return observableThrowError(this.unwrapHttpValue(error));
      }),
      finalize(() => {
        if (showBlockUI) {
          this.blockUI.stop();
        }
      })
    );
  }

  public put<T>(url: string, data?: any, params?: any, toastMessage?: string, showBlockUI: boolean = true): Observable<T> {
    if (showBlockUI) {
      this.blockUI.start();
    }

    return this.http.put<T>(url, data).pipe(
      catchError((error: any) => {
        this.errorMessage(error);
        return observableThrowError(this.unwrapHttpValue(error));
      }),
      finalize(() => {
        if (showBlockUI) {
          this.blockUI.stop();
        }
      })
    );
  }

  public putWithOptions<T>(url: string, body?: any, options?: AppHttpOptions, showBlockUI: boolean = true): Observable<T> {
    if (showBlockUI) {
      this.blockUI.start();
    }

    return this.http.put<T>(url, body, options).pipe(
      catchError((error: any) => {
        this.errorMessage(error);
        return observableThrowError(this.unwrapHttpValue(error));
      }),
      finalize(() => {
        if (showBlockUI) {
          this.blockUI.stop();
        }
      })
    );
  }

  public delete<T>(url: string, showBlockUI: boolean = true): Observable<T> {
    if (showBlockUI) {
      this.blockUI.start();
    }

    return this.http.delete<T>(url).pipe(
      catchError((error: any) => {
        this.errorMessage(error);
        return observableThrowError(this.unwrapHttpValue(error));
      }),
      finalize(() => {
        if (showBlockUI) {
          this.blockUI.stop();
        }
      })
    );
  }

  public deleteWithOptions<T>(url: string, options: AppHttpOptions, showBlockUI: boolean = true): Observable<T> {
    if (showBlockUI) {
      this.blockUI.start();
    }

    return this.http.delete<T>(url, options).pipe(
      catchError((error: any) => {
        this.errorMessage(error);
        return observableThrowError(this.unwrapHttpValue(error));
      }),
      finalize(() => {
        if (showBlockUI) {
          this.blockUI.stop();
        }
      })
    );
  }

  private buildUrlSearchParams(params: any): HttpParams {
    const searchParams = new HttpParams();
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        searchParams.append(key, params[key]);
      }
    }
    return searchParams;
  }

  private unwrapHttpValue(value: any): any {
    if (value === null) {
      return value;
    }

    if (typeof value === 'string') {
      value = JSON.parse(value);
    }

    if (value['f'] === 'cjson') {
      value = window['CJSON'].expand(value);
    }

   // const camelizedValue = this.utilityService.toCamelCase(value);

    // When session is expired, redirect to the session-expiry component, which then redirects to the login page
    // if (camelizedValue?.statusCode === 302 && camelizedValue?.sessionExpired) {
    //   this.router.navigate(['session-expiry', camelizedValue.autoLogout]);
    // }

    // return (camelizedValue);
    return(value);
  }

  private errorMessage(error: any, showDefaultToaster: boolean = true): void {
    let finalMessage = 'Error response received';
    if (error && !this.isUnauthorize(error) && showDefaultToaster) {
      if (error.error) {
        if (typeof error.error === 'string') {
          try {
            error.error = JSON.parse(error.error);
          } catch (e) {
          }
        }

        if (error.error.errors?.constructor === Array) {
          finalMessage = error.error.errors[0].message;
        }
        else if (error.error.error?.constructor === String) {
          finalMessage = error.error.error;
        }
        else {
          finalMessage = error.message;
        }

      }
      else {
        finalMessage = error.message;
      }

     // this.utilityService.callSnackBar(finalMessage, 'error');
    }
  }

  private isUnauthorize(errRes: any): boolean {
    let errorHandled = false;
    const isUnauthorize = errRes.status === 401;
    const isTimeclockRequest = window.location.href.indexOf('/timeclock/') > -1;
    if (isUnauthorize && isTimeclockRequest) {
    //  this.utilityService.redirectToLogin();
      errorHandled = true;
    }
    return errorHandled;
  }
}
