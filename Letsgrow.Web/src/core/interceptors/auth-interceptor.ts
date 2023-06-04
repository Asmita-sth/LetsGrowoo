import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

import { DeviceDetectorService } from 'ngx-device-detector';
import { tap } from 'rxjs/operators';
import { AppConfig } from 'src/app/app.config';
import { UtilityService } from 'src/app/core/service/utility.service';



const TTL = 10 * 60;

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  cachedResponse: any;



  constructor(

   private utilityService: UtilityService,
    public deviceService: DeviceDetectorService
  ) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let authReq: HttpRequest<any>;
    const excludeArray = ['/assets/'];
    if (excludeArray.some(v => req.url.includes(v))) {
      authReq = req;
    }
    else {
      authReq = this.getRequestWithHeaders(req);
    }

    return this.sendRequest(authReq, next);
  }

  sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(tap(event => {
      if (event instanceof HttpResponse) {
        // this.ngxCache.setHttpReponse(req.urlWithParams.replace("refresh=true", "").replace("refresh=false", "").replace("refresh=undefined", ""), event, TTL);
        // this.cache.set(req.urlWithParams, event, TTL);
      }
    }));
  }

  getRequestWithHeaders(req: HttpRequest<any>): HttpRequest<any> {
    // Clone the request to add the new header.
    let headers = req.headers;

    const authTokens =this.utilityService.getLocalStorage('token');
    const allowAnonymous = headers.has('AllowAnonymous') && headers.get('AllowAnonymous').toLowerCase() === 'true';

   // sessionStorage.setItem('deviceInfo', JSON.stringify(AppConfig.userTrackingInfo));

    let sessionHeaderParams = {};

    if (!allowAnonymous) {
      const decodedSessionInfo = sessionStorage.getItem('sessionInfo') ? JSON.parse(sessionStorage.getItem('sessionInfo')) : null;
      if (authTokens) {
        headers = headers.set('Authorization', 'Bearer ' + authTokens);
        if (1!=1) {
          // Redirect to session-expiry page
          // Since the return type is HttpRequest, also returning the 302 status code through the /Login Get endpoint, which has been handled in web-api.service's unwrapHttpValue()
          window.location.href = './session-expiry/false';
          return new HttpRequest('GET', AppConfig.settings.apiUrl + 'Account/Login?autoLogout=false');
        }

        let sessionHeader = sessionStorage.getItem('headerParams');
        if (!sessionHeader) {
          sessionHeaderParams = { roleId: 0, applicationId: 0, organizationId: 0, officeId: 0, deviceType: 0 };
        } else {
          sessionHeaderParams = JSON.parse(sessionHeader);
        }

        sessionStorage.setItem('headerParams', JSON.stringify(sessionHeaderParams));

      }
      else if (decodedSessionInfo) {
        // Redirect to session-expiry page
        // Since the return type is HttpRequest, also returning the 302 status code through the /Login Get endpoint, which has been handled in web-api.service's unwrapHttpValue()
        window.location.href = './session-expiry/true';
        return new HttpRequest('GET', AppConfig.settings.apiUrl + 'Account/Login?autoLogout=true');
      }
    }

    //sessionHeaderParams['platformType'] = 'Web';
    headers = headers.set('HeaderParams', JSON.stringify(sessionHeaderParams));

    headers = headers.set('Access-Control-Allow-Origin', '*');

    if (headers.get('Content-Type') === 'angular/auto') {
      headers = headers.delete('Content-Type');
    }
    else {
      headers = headers.set('Content-Type', 'application/json; charset=UTF-8');
    }

    return req.clone({ headers });
  }

}
