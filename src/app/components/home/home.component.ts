import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  public errorMessage: string = 'Kindly fill the email id in xyz@gmail.com format';

  public signUpFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.nullValidator, Validators.email]),
  });

  public showSignUpForm: boolean = true;

  constructor() {}

  ngOnInit(): void {
    sessionStorage.removeItem('email');
  }

  /*
   * Method will set the user email into session and hides the signup form.
   */
  public signUp(): void {

    const email = this.signUpFormGroup.controls.email.value;

    if (this.signUpFormGroup.dirty && this.signUpFormGroup.valid && email) {
      sessionStorage.setItem('email', email);
      this.showSignUpForm = false;
    }
  }
}
