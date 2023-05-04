import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LoginService} from "../../../services/login.service";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  progress_bar = false;
  public userForm: FormGroup;

  constructor(private fb: FormBuilder, private snack: MatSnackBar, private loginService:LoginService, private router:Router) {
    this.userForm = this.fb.group({
        email : new FormControl('', [Validators.required, Validators.email]),
        pw : new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
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
    this.progress_bar = true;

    this.loginService.generateToken(this.userForm.getRawValue()).pipe(
      switchMap((data: any) => {
        this.loginService.loginUser(data.token);
        return this.loginService.getCurrentUser();
      })
    ).subscribe((user: any) => {
      this.loginService.setUser(user);

      if (this.loginService.getUserRole() == 'USER') {
        //user dashboard
        this.progress_bar = false;
        this.router.navigate(['user']);
        this.loginService.loginStatusSubjec.next(true);
      }
      else if (this.loginService.getUserRole() == 'ADMIN') {
        //dashboard admin
        this.progress_bar = false;
        this.router.navigate(['admin']);
        this.loginService.loginStatusSubjec.next(true);
      }
      else {
        this.progress_bar = false;
        this.loginService.logout();
      }
    }, (error) => {
      this.progress_bar = false;
      this.snack.open('Detalles inválidos, vuelva a intentar!!\n' + error, 'Aceptar', {
        duration: 3000
      });
    });
  }
}

