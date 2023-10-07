import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {Observable, of, Subject, throwError} from "rxjs";
import { catchError, filter, map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import {user} from "./user";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiServerUrl = environment.apiBaseUrl;
  public loginStatusSubjec = new Subject<boolean>();

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  public generateToken(loginData: any): Observable<any> {
    return this.http.post(`${this.apiServerUrl}/auth/generate-token`, loginData);
  }

  public getModUser() : any {
    const usrMod = localStorage.getItem('modUser');
    if(usrMod){
      return JSON.parse(usrMod);
    }else{
      return null;
    }
  }

  public setModUser(usr:user) {
    localStorage.setItem('modUser',JSON.stringify(usr));
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
    localStorage.clear();
    this.cookieService.delete('user');
  }

  public setUser(user: any): void {
    this.cookieService.set('user', JSON.stringify(user));
  }

  public getUser(): any {
    const userStr = this.cookieService.get('user');
    if (userStr) {
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

  public getUserRole(token: string): Observable<string> {
    const url = `${this.apiServerUrl}/auth/rl-user?token=${token}`;
    return this.http.get<string[]>(url).pipe(
      map((roles: string[]) => {
        return roles[0];
      }),
      catchError((error) => {
        this.logout();
        return throwError(error);
      })
    );
  }

  public getCurrentUser(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/auth/actual-user`);
  }

  public getUserData(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/usr/${this.getUser().username}`);
  }

  public getPreferences(correo:String) :Observable<String[]>{
    return this.http.get<String[]>(`${this.apiServerUrl}/usr/preferences/${correo}`);
  }

  public getToken() {
    try {
      return localStorage.getItem('token');
    } catch (error) {
      console.error('Error al acceder a localStorage:', error);
      return null;
    }
  }

  public getUserRole2(): string {
    const user = this.getUser();
    if (user?.authorities[0]?.authority) {
      return user.authorities[0].authority;
    }
    return '';
  }
}
