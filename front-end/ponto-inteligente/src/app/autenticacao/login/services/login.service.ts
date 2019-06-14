import { environment as env } from './../../../../environments/environment';
import { Login } from './../model/login';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly PATH: string = 'auth';

  constructor(private http: HttpClient) {}

  logar(login: Login): Observable<any> {
    return this.http.post(env.baseUrl + this.PATH, login);
  }

}
