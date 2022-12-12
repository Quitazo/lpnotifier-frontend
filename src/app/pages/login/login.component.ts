import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {userService} from "../../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  progress_bar = false;
  hide = true;
  public userForm: FormGroup;

  constructor(private fb: FormBuilder, private snack: MatSnackBar, private loginService:LoginService) {
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
    this.loginService.generateToken(this.userForm.getRawValue()).subscribe(
      (data:any) => {
        console.log(data);
        this.loginService.saveToken(data.token);
        this.loginService.getCurrentUser().subscribe((user:any) => {
          this.loginService.setUser(user);
          console.log(user);
        })
      },error => {
        console.log("Error en login ");
      }
    )
    // this.snack.open('Funciona el coso.','Cerrar',{
    //   duration: 3000,
    //   verticalPosition: "top"
    // });
  }
}

