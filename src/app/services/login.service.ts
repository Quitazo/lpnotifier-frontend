import { environment } from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable } from '@angular/core';
import {userService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http:HttpClient) {
  }
  public generateToken(loginData:any) {
    console.log("Datos de login services " + loginData);
    return this.http.post(`${this.apiServerUrl}/auth/generate-token`,loginData);
  }

  public getCurrentUser(){
    return this.http.get(`${this.apiServerUrl}/usr/actual-usuario`);
  }

  public saveToken(token:any) {
    localStorage.setItem('token',token);
  }

  public isLoggedIn() {
    let tokenStr = this.getToken();
    return !(tokenStr == undefined || tokenStr == '' || tokenStr == null);
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  public getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      console.log(JSON.stringify(userStr));
      return JSON.stringify(userStr);
    }else {
      this.logout();
      return null;
    }
  }
  public setUser(user:any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  // public getUserRole() {
  //   let user = this.getUser();
  //   user.authorities[0].getRole();
  //   return user.authorities[0].getRole();
  // }
}
