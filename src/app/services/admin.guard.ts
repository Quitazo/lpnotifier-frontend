import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from "./login.service";
import {map} from "rxjs/operators";
import {Location} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  private token = this.loginService.getToken();
  constructor(private loginService:LoginService, private router:Router, private location: Location){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.loginService.isLoggedIn() && this.token != null) {
      return this.loginService.getUserRole(this.token).pipe(
        map(rol => {
          if (rol === 'ADMIN') {
            return true;
          } else {
            this.location.back();
            return false;
          }
        })
      );
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
