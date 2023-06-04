import { Injectable, OnDestroy } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { PersonModel } from "../models/app.model";

var CryptoJS = require("crypto-js");
@Injectable(
  {
    providedIn: 'root'
  }
)
export class UtilityService implements OnDestroy {
  private _unsubscribeAll: any;

  jwtHelper: JwtHelperService = new JwtHelperService();
  znplSecretKey = '1212121@123';




  constructor
    (

    ) {

  }


  setLocalStorage(key, value) {
    let znpl: any = localStorage.getItem('ZNPL') ? JSON.parse(this.decrypt(localStorage.getItem('ZNPL'))) : {};
    let json = {};
    json[key] = value;
    znpl = Object.assign(znpl, json);

    if (key.toLowerCase() === 'token') {
      const decodedToken = this.jwtHelper.decodeToken(value) as PersonModel;
      sessionStorage.setItem('sessionInfo', JSON.stringify({ personId: decodedToken.personId, tenant: decodedToken.tenant }));
    }

    localStorage.setItem('ZNPL', this.encrypt(JSON.stringify(znpl)));
  }


  encrypt(value) {

    return CryptoJS.AES.encrypt(value, this.znplSecretKey);
  }


  getTokenValueByKey(key: string): any {
    const token = this.getLocalStorage('token');
    if (token) {
      const person = this.jwtHelper.decodeToken(token) as any[];
      //if u need all the values from the token- Pass All
      if (key.charAt(0).toUpperCase() + key.slice(1) === 'All') {
        return person;
      }
      var ret = person[key];
      return ret;
    }
    return '';
  }

  isTokenValid(): boolean {
    let token = this.getLocalStorage('token');
    const decodedToken = this.jwtHelper.decodeToken(token) as PersonModel;
    const decodedSessionInfo = sessionStorage.getItem('sessionInfo') ? JSON.parse(sessionStorage.getItem('sessionInfo')) : null;
    return (token && !this.jwtHelper.isTokenExpired(token) && decodedSessionInfo && decodedToken.personId == decodedSessionInfo.personId && decodedToken.tenant == decodedSessionInfo.tenant);
  }

  getLocalStorage(key) {

    if (localStorage.getItem('ZNPL')) {

      let znpl = JSON.parse(this.decrypt(localStorage.getItem('ZNPL')));
      return znpl[key];
    }
  }
  decrypt(value) {
    // Decrypt

    var bytes = CryptoJS.AES.decrypt(value.toString(), this.znplSecretKey);
    var decrytedText = bytes.toString(CryptoJS.enc.Utf8);
    return decrytedText;

  }

  removeLocalStorage(key) {
    if (localStorage.getItem('ZNPL')) {
      let znpl = JSON.parse(this.decrypt(localStorage.getItem('ZNPL')));

      if (znpl.hasOwnProperty(key)) {
        delete znpl[key];
        localStorage.setItem('ZNPL', this.encrypt(JSON.stringify(znpl)));
      }

    }
  }

  clearLocalStorage() {
    if (localStorage.getItem('ZNPL')) {
      localStorage.removeItem('ZNPL');
    }
  }

  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
