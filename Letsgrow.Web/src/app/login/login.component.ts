import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AccountService } from '../core/service/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading = false;
  submitted = false;
  userModel: any = {
    userName: '',
    password: '',
  };

  @ViewChild('loginForm') loginForm: NgForm;
  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private accountService: AccountService

  ) { }

  ngOnInit() {
      // this.form = this.formBuilder.group({
      //     username: ['', Validators.required],
      //     password: ['', Validators.required]
      // });
  }


  onSubmit() {
      this.submitted = true;

      // reset alerts on submit
     // this.alertService.clear();

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;
      this.accountService.login(this.userModel)
          .pipe(first())
          .subscribe({
              next: () => {
                  // get return url from query parameters or default to home page
                  const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                  this.router.navigateByUrl(returnUrl);
              },
              error: error => {
               //   this.alertService.error(error);
                  this.loading = false;
              }
          });
  }
}
