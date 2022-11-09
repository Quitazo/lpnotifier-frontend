import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {userService} from "../../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  progress_bar = false;
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  public userForm: FormGroup;

  constructor(private fb: FormBuilder, private snack: MatSnackBar) {
    this.userForm = this.fb.group({
        username: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
        email : new FormControl('', [Validators.required, Validators.email]),
        pw : new FormControl('', [Validators.required]),
      });
  }

  ngOnInit(): void {
  }

  getErrorEmailMessage() {
    if (this.userForm.get('email')?.hasError('required')) {
      return 'You must enter a Email';
    }
    return this.userForm.get('email')?.hasError('email') ? 'Not a valid email' : '';
  }
  getErrorPwMessage() {
    if (this.userForm.get('pw')?.hasError('required')) {
      return 'You must enter a Password';
    }
    return this.userForm.get('pw')?.hasError('password') ? 'Not a valid password' : '';
  }

  formLogin() {

  }
}

