import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { HomeService } from './home.service';
import { Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<void>;
  gridData: any;
  userModel: any = {
    userName: '',
    email: '',
    password: '',
  };

  constructor(public homeService: HomeService,
    public snackBar: MatSnackBar) {
    this._unsubscribeAll = new Subject<void>();
  }

  ngOnInit() {
    this.getuserList();
  }

  getuserList() {
    let json = {
      callFor: 'Home',
    };

    this.homeService
      .getUsers(JSON.stringify(json))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response) => {
        if (response) {
          this.gridData = response;  //not used for now
        }
      });
  }

  createUser() {
    this.homeService
      .createUser(this.userModel)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response) => {
        if (response) {
          console.log('User Added SucessFully.');
          this.snackBar.open('User Added SucessFully','',{
            duration: 2000,
          } );

        }


      });
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
