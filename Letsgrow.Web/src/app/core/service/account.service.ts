import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfig } from 'src/app/app.config';
import { WebApiService } from './web.api.service';
import { UtilityService } from './utility.service';


@Injectable({ providedIn: 'root' })
export class AccountService {

    private userSubject: BehaviorSubject<any>;
    public user: Observable<any>;
    private basePath = AppConfig.apiUrl;

    constructor(
        private router: Router,
        private utilityService : UtilityService,
        private webApiService : WebApiService,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): any {
        return this.userSubject.value;
    }

    login(json: any) {
        return this.http.post<any>(this.basePath + 'User/Login', json)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
               this.utilityService.setLocalStorage('token', user?.accessToken)
                //localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }
    // return this.webApiService.get(this.basePath + 'User/GetUser', {
    //   json: json,
    // });

    //while post we only send the json no json wrapper no stringify need IMPORTANT
    register(user: any) {
       // return this.http.post(this.basePath + 'user/register', user);

        return this.webApiService.post(this.basePath + 'User/Register',
             user,
        );
    }

    getAll() {
        return this.http.get<any[]>(this.basePath + '/users');
    }


    update(id, params) {
        return this.http.put(this.basePath + '/users/${id}', params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(this.basePath + '/users/${id}')
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue.id) {
                    this.logout();
                }
                return x;
            }));
    }
}
