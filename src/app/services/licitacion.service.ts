import { Injectable } from '@angular/core';
import {licitacion} from "./licitacion";
import {Observable} from "rxjs";
import {user} from "./user";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LicitacionService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getLicitaciones(): Observable<licitacion[]> {
    return this.http.get<licitacion[]>(`${this.apiServerUrl}/lp/`);
  }

  public getLicitacionesForPreferences(correo:String): Observable<licitacion[]>{
    return this.http.get<licitacion[]>(`${this.apiServerUrl}/lp/`+correo);
  }

  public getPreferences(correo:String): Observable<String[]>{
    return this.http.get<String[]>(`${this.apiServerUrl}/usr/preferences/`+correo);
  }

  public updatePreferences(correo:String, preferences:Boolean[]){
    return this.http.put(`${this.apiServerUrl}/usr/savepreference/`+correo, preferences);
  }

}
