import { Component, OnInit } from '@angular/core';
import {userService} from "../../../services/user.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LoginService} from "../../../services/login.service";
import {Router} from "@angular/router";
import {user} from "../../../services/user";
import {LicitacionService} from "../../../services/licitacion.service";


function MatchValidator(pw: string, pw2: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.get(pw);
    const matchingControl = formGroup.get(pw2);

    if (matchingControl?.errors && !matchingControl.errors['No concuerdan']) {
      return;
    }

    if (control?.value !== matchingControl?.value) {
      matchingControl?.setErrors({ not_matching: true });
    } else {
      matchingControl?.setErrors(null);
    }
  };
}

interface Preferencia{
  valor: String;
}

@Component({
  selector: 'app-root-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  hide = true;
  hide1 = true;
  hide2 = true;
  progress_bar = false;
  progress_bar2 = false;
  progress_bar3 = false;

  public userMod: FormGroup;
  public pwMod: FormGroup;
  public preferencias: Preferencia[] = [];
  public preferenciaValores: boolean[] = [];
  public usr: user = {
    name: '',
    email: '',
    enable: true,
    username: '',
    pw: '',
    phone: 0
  };

  constructor(private licitacionService:LicitacionService, private userService:userService, private fb: FormBuilder, private snack: MatSnackBar, private loginService:LoginService, private router:Router) {
    this.loginService.getUserData().subscribe((usrTemp: user) => {
      this.usr = usrTemp;
    });
    this.userMod = this.fb.group({
      name : new FormControl('', [Validators.minLength(6), Validators.maxLength(60)]),
      username : new FormControl('', [Validators.minLength(6), Validators.maxLength(60)]),
      phone: new FormControl('', [Validators.minLength(6), Validators.maxLength(20)]),
    });

    this.pwMod = this.fb.group({
      oldpw: ['', Validators.required, Validators.maxLength(60)],
      pw: ['', Validators.required, Validators.minLength(6), Validators.maxLength(60)],
      pw2: ['', Validators.required, Validators.minLength(6), Validators.maxLength(60)],
    }, {
      validators: [MatchValidator('pw', 'pw2')]
    });
  }

  ngOnInit() {
    const user = this.loginService.getUser();
    if (user){
      const username = user.username;
      this.licitacionService.getPreferences(username).subscribe((response: String[]) => {
        this.preferencias = response.map( valor => ({ valor }));
      });
    }
  }
  getErrorOldPwMessage() {
    if (this.pwMod.get('old')?.hasError('required')) {
      return 'Es necesario ingresar una Contraseña.';
    }
    return this.pwMod.get('old')?.hasError('oldPassword') ? 'La contraseña ingresada no es valida.' : '';
  }

  getErrorPwMessage() {
    if (this.pwMod.get('pw')?.hasError('required')) {
      return 'Es necesario ingresar una Contraseña.';
    }
    return this.pwMod.get('pw')?.hasError('password') ? 'La contraseña ingresada no es valida.' : '';
  }
  getErrorPwsMessage() {
    if (this.pwMod.get('pw2')?.hasError('required')) {
      return 'Es necesario confirmar la Contraseña.';
    }
    return this.pwMod.get('pw2')?.hasError('not_matching') ? 'Las contraseñas no concuerdan!' : '';
  }

  formModUser() {
    this.progress_bar = true;
    const token = this.loginService.getToken();
    if (this.userMod.valid && token!=null) {

      const formValue = this.userMod.value;

      // Actualizar las propiedades del objeto usr con los valores del formulario
      this.usr.name = formValue.name;
      this.usr.username = formValue.username;
      this.usr.phone = formValue.phone;

      this.userService.updateUser(token, this.usr).subscribe(() => {
          this.progress_bar = false;
          this.snack.open('Datos guardados con exito.', 'Aceptar', {
            duration: 3000
          });
        }, (error) => {
          this.progress_bar = false;
          this.snack.open('Detalles inválidos , vuelva a intentar !!\n' + error.error.message, 'Aceptar', {
            duration: 3000
          });
        }
      )
    } else {
      this.progress_bar = false;
      this.snack.open('Formulario invalido', 'Aceptar', {
        duration: 3000
      });
    }
  }


  updateUser() {
    this.progress_bar3 = true;
    const token = this.loginService.getToken();
    console.log("PWS VALID "+this.pwMod.valid)

    if (this.pwMod.valid && token!=null) {
      const formValue = this.pwMod.value;
      console.log("PWS VALUES "+formValue.oldpw+" "+formValue.pw1)
      const pws:string[] = [formValue.oldpw, formValue.pw1];

      this.userService.updatePw(token, pws).subscribe(() => {
          this.progress_bar3 = false;
          this.snack.open('Datos guardados con exito.', 'Aceptar', {
            duration: 3000
          });
        }, (error) => {
          this.progress_bar3 = false;
          this.snack.open('Detalles inválidos , vuelva a intentar !!\n' + error.message.message, 'Aceptar', {
            duration: 3000
          });
        }
      )
    } else {
      this.progress_bar3 = false;
      this.snack.open('Formulario invalido', 'Aceptar', {
        duration: 3000
      });
    }
  }

  updatePreference(): void {
    // Convertir los valores de preferencia a un array de booleanos
    this.progress_bar2 = true;

    this.preferenciaValores.splice(0, this.preferencias.length);
    this.preferencias.forEach(preferencia => {
      this.preferenciaValores.push(Boolean(preferencia.valor));
    });

    const username = this.loginService.getUser().username;
    if (username) {
      // Llamar al servicio para actualizar las preferencias con los valores actualizados
      this.licitacionService.updatePreferences(username, this.preferenciaValores).subscribe(() => {
        this.progress_bar2 = false;
        this.snack.open('Preferencias actualizadas con éxito.','Aceptar',{
          duration:3000
        });
      },(error) => {
        this.progress_bar2 = false;
        this.snack.open('Detalles inválidos , vuelva a intentar !!\n'+error.error.message,'Aceptar',{
          duration:3000
        });
      });
    }
  }

  // preferencias = [...]; // Tus preferencias aquí

  getTextForIndex(index: number): string {
    switch (index) {
      case 0: return "Concensio";
      case 1: return "CompraVenta";
      case 2: return "Seguros";
      case 3: return "nd";
      case 4: return "Suministros";
      case 5: return "Servicio de aprovisionamiento";
      case 6: return "Obra";
      case 7: return "Otros Servicios";
      default: return "";
    }
  }
}
