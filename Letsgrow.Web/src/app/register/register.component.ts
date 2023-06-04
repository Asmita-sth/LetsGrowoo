import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountService } from '../core/service/account.service';
import { first } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loading = false;
  submitted = false;
  userModel: any = {
    name :'',
    email :'',
    userName: '',
    password: '',


  };
  @ViewChild('registerForm') registerForm: NgForm;

  constructor( private accountService : AccountService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }


  onSubmit() {
    this.submitted = true;


    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    this.loading = true;
    this.accountService.register(this.userModel)
        .pipe(first())
        .subscribe({
            next: () => {
               // this.alertService.success('Registration successful', { keepAfterRouteChange: true });
                this.router.navigate(['../login'], { relativeTo: this.route });
            },
            error: error => {

                this.loading = false;
            }
        });
}

}
