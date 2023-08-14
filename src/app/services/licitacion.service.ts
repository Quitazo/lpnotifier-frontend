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
}
