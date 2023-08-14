import { Component, OnInit } from '@angular/core';
import {userService} from "../../../services/user.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LoginService} from "../../../services/login.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-root-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  hide = true;
  progress_bar = false;
  public userMod: FormGroup;

  constructor(private userService:userService, private fb: FormBuilder, private snack: MatSnackBar, private loginService:LoginService, private router:Router) {
    this.userMod = this.fb.group({
      name : new FormControl('', [Validators.required]),
      email : new FormControl('', [Validators.required, Validators.email]),
      pw : new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      telefono: new FormControl('', [Validators.minLength(6), Validators.maxLength(20)]),
    });
  }

  ngOnInit(): void {
    console.log("User name --> "+this.loginService.getUser());
  }

  formModUser() {
    this.progress_bar = true;
    this.userService.updateUser(this.userMod.getRawValue()).subscribe(
      (data:any) => {

      },(error) => {
        this.progress_bar = false;
        this.snack.open('Detalles inválidos , vuelva a intentar !!\n'+ error,'Aceptar',{
          duration:3000
        });
      }
    )
  }
}
