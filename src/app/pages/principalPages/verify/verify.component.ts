import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {userService} from "../../../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {user} from "../../../services/user";

@Component({
  selector: 'app-root-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  private verificationToken: any;

  constructor(private userService:userService, private snack: MatSnackBar, private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.activatedRoute.queryParams.subscribe(params => {
        const verificationToken = params['token'];
        if (verificationToken != null) {
          this.verificationToken = verificationToken;

          this.userService.verifyUser(this.verificationToken).subscribe(
          (messege) => {
              this.snack.open('El usuario verificado exitosamente. '+messege, 'Aceptar', {
                duration: 5000
              });
            },
            (error) => {
              this.snack.open('Procesndo validación. '+error.error.message, 'Aceptar', {
                duration: 5000
              });
            }
          );

          // setTimeout(() => {
          //   this.router.navigate(['login']);
          // }, 6000);
        }
      }, (error) => {
        this.snack.open('#2 '+error.error.message, 'Aceptar', {
          duration: 5000
        });
      })
    }, 3000);
  }
}
