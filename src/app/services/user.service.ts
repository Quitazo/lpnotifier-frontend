import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { user } from "./user";
import { environment } from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class userService {
  private apiServerUrl = environment.apiBaseUrl;
  private apiVerifyUrl = environment.apiAuthUrl;

  constructor(private http: HttpClient) {}

  public getUsers(): Observable<user[]> {
    return this.http.get<user[]>(`${this.apiServerUrl}/usr`)
  }
  public addUser(usr: user): Observable<user> {
    return this.http.post<user>(`${this.apiServerUrl}/usr`,usr);
  }
  public updateUser(usr: user): Observable<user> {
    return this.http.put<user>(`${this.apiServerUrl}/usr`,usr);
  }
  public updatePw(pws:string[]): Observable<user> {
    return this.http.put<user>(`${this.apiServerUrl}/usr/updatePw`,pws);
  }
  public deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/usr/${userId}`);
  }
  public verifyUser(token: string): Observable<string> {
    console.log('URL '+this.apiVerifyUrl+' TOKEN '+token);
    return this.http.get<string>(`${this.apiVerifyUrl}/verify?token=${token}`);
  }
}
