import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, ValidatorFn, Validators} from "@angular/forms";
import {userService} from "../../services/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true;
  hide2 = true;
  public userForm: FormGroup;

  constructor(private userServices: userService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(60)]),
      username: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      email : new FormControl('', [Validators.required, Validators.email]),
      pw : new FormControl('', [Validators.required]),
      pw2 : new FormControl('', [Validators.required]),
      phone : new FormControl(null, [Validators.maxLength(15)])
    },
      {
        // validators: [Validation.match('password', 'confirmPassword')]
      });
  }

  ngOnInit(): void { }

  getErrorNameMessage() {
    if (this.userForm.get('name')?.hasError('required')) {
      return 'You must enter a Name';
    }
    return this.userForm.get('name')?.hasError('name') ? 'Not a valid name' : '';
  }
  getErrorUsernameMessage() {
    if (this.userForm.get('username')?.hasError('required')) {
      return 'You must enter a Username';
    }
    return this.userForm.get('name')?.hasError('username') ? 'Not a valid username' : '';
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
  getErrorPwsMessage() {
    if (this.userForm.get('pw2')?.hasError('required')) {
      return 'You must enter a ConfirmPassword';
    }
    return this.userForm.get('pw2')?.hasError('not_matching') ? 'The password doesn\'t match!' : '';
  }


  formSubmit() {
    this.userServices.addUser(this.userForm.value).subscribe(
      (data) => {
        alert("El usuario con el correo "+data.name+" ha sido creado con exito.")
      }
    )
  }
}
