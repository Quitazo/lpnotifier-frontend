import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { userService } from "../../../services/user.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import Swal from "sweetalert2";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  progress_bar = false;
  hide = true;
  hide2 = true;
  public userForm: FormGroup;

  constructor(private userServices: userService, private fb: FormBuilder, private snack: MatSnackBar) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(60)]],
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(60)]],
      email: ['', [Validators.required, Validators.email]],
      pw: ['', Validators.required],
      pw2: ['', Validators.required],
      phone: [null, [Validators.maxLength(15)]]
    }, {
      validators: this.matchValidator
    });
  }

  matchValidator(formGroup: FormGroup) {
    const password = formGroup.get('pw')?.value;
    const confirmPassword = formGroup.get('pw2')?.value;

    // Validar longitud de la contraseña
    if (password && password.length > 60) {
      formGroup.get('pw')?.setErrors({ invalid_length: true });
    } else {
      formGroup.get('pw')?.setErrors(null);
    }

    if (password !== confirmPassword) {
      formGroup.get('pw2')?.setErrors({ not_matching: true });
    } else {
      formGroup.get('pw2')?.setErrors(null);
    }
  }

  ngOnInit(): void { }

  getErrorNameMessage() {
    if (this.userForm.get('name')?.hasError('required')) {
      return 'Es necesario insertar un nombre.';
    }
    return this.userForm.get('name')?.hasError('name') ? 'No es un nombre valido.' : '';
  }
  getErrorUsernameMessage() {
    if (this.userForm.get('username')?.hasError('required')) {
      return 'Es necesario ingresar un Username.';
    }
    return this.userForm.get('name')?.hasError('username') ? 'El username ingresado no es valido.' : '';
  }
  getErrorEmailMessage() {
    if (this.userForm.get('email')?.hasError('required')) {
      return 'Es necesario ingresar un Email.';
    }
    return this.userForm.get('email')?.hasError('email') ? 'El Email ingresado no es valido.' : '';
  }
  getErrorPwMessage() {
    if (this.userForm.get('pw')?.hasError('required')) {
      return 'Es necesario ingresar una Contraseña.';
    }
    return this.userForm.get('pw')?.hasError('password') ? 'La contraseña ingresada no es valida.' : '';
  }
  getErrorPwsMessage() {
    if (this.userForm.get('pw2')?.hasError('required')) {
      return 'Es necesario confirmar la Contraseña.';
    }
    return this.userForm.get('pw2')?.hasError('not_matching') ? 'Las contraseñas no concuerdan!' : '';
  }

  formSubmit() {
    try {
      this.progress_bar = true;
      if (this.userForm.valid) {
        const user = this.userForm.value;
        this.userServices.addUser(user).subscribe((data) => {
              this.progress_bar = false;
              Swal.fire({
                title: 'Usuario Guardado',
                html: 'El usuario con el correo ' + data.email + ' ha sido creado con exito.' + '\n(Revisa el correo para activar la cuenta)',
                showConfirmButton: true,
                icon: 'success',
                timer: 5000
              })
            }, (error) => {
              this.progress_bar = false;
              this.snack.open('Ha ocurrido un error al guardar el usuario.\n' + error.error.message, 'Cerrar', {
                duration: 3000,
                verticalPosition: "top"
              });
            }
          )
      } else {
        this.progress_bar = false;
        Swal.fire({
          icon: 'error',
          title: 'Formulario invalido',
          text: 'Llenar bien los campos!!!',
        })
      }
    } catch (e){
      console.log(e);
    }
  }
}
