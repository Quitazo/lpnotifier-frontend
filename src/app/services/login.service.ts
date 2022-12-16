import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {user} from "./user";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiServerUrl = environment.apiBaseUrl;
  public loginStatusSubjec = new Subject<boolean>();

  constructor(private http:HttpClient) {
  }
  public generateToken(loginData:any) {
    console.log("Datos de login services " + loginData);
    return this.http.post(`${this.apiServerUrl}/auth/generate-token`,loginData);
  }

  public loginUser(token:any) {
    localStorage.setItem('token',token);
    return true;
  }

  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    }else {
      return true;
    }
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  public setUser(user:any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr != null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }

  public getCurrentUser(){
    return this.http.get(`${this.apiServerUrl}/auth/actual-user`);
  }
}
