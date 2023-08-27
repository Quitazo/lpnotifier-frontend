import { Component, OnInit } from '@angular/core';
import {userService} from "../../../services/user.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LoginService} from "../../../services/login.service";
import {LicitacionService} from "../../../services/licitacion.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  hide = true;
  progress_bar = false;
  public userMod: FormGroup;
  public pwMod: FormGroup;
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
      name : new FormControl('', [Validators.required]),
      email : new FormControl('', [Validators.required, Validators.email]),
      pw : new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      telefono: new FormControl('', [Validators.minLength(6), Validators.maxLength(20)]),
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

  formModUser() {
    this.progress_bar = true;
    this.userService.updateUser(this.userMod.getRawValue()).subscribe(
      (data:any) => {
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe((user:any) => {
          this.loginService.setUser(user);

          console.log(this.loginService.loginUser(data.token));
        })
      },(error) => {
        this.progress_bar = false;
        this.snack.open('Detalles inválidos , vuelva a intentar !!\n'+ error,'Aceptar',{
          duration:3000
        });
      }
    )
  }

  formModUser() {
    this.progress_bar = true;

    if (this.userMod.valid) {
      const formValue = this.userMod.value;

      // Actualizar las propiedades del objeto usr con los valores del formulario
      this.usr.name = formValue.name;
      this.usr.username = formValue.username;
      this.usr.phone = formValue.phone;

      this.userService.updateUser(this.usr).subscribe((data: any) => {
          this.progress_bar = false;
          this.snack.open('Datos guardados con exito.', 'Aceptar', {
            duration: 3000
          });
        }, (error) => {
          this.progress_bar = false;
          this.snack.open('Detalles inválidos , vuelva a intentar !!\n' + error, 'Aceptar', {
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

  updatePreference(): void {
    // Convertir los valores de preferencia a un array de booleanos
    this.progress_bar2 = true;
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
        this.snack.open('Detalles inválidos , vuelva a intentar !!\n'+ error,'Aceptar',{
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
