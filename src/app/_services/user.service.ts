import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import {Observable} from "rxjs";
import {Aluno} from "../dao/aluno";
import {finalize, map} from "rxjs/operators";
import {AbstractControl, ɵFormGroupRawValue, ɵGetProperty, ɵTypedOrUntyped} from "@angular/forms";
import {Exercicio} from "../dao/exercicio";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiURL = 'http://localhost:8080';

  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  constructor(
    private httpclient: HttpClient,
    private userAuthService: UserAuthService
  ) {}

  public login(loginData: any) {
    return this.httpclient.post(this.apiURL + '/api/auth/signin', loginData, {
      headers: this.requestHeader,
    });
  }

  forgotPassword(email: any): Observable<string> {
    return this.httpclient.post<string>(`${this.apiURL}/api/auth/forgot-password?email=${email}`, email, {
      headers: this.requestHeader,
    });
  }

  resetPassword(token: any, password: any): Observable<string> {
    return this.httpclient.post<string>(`${this.apiURL}/api/auth/reset-password?token=${token}&password=${password}`, {
      headers: this.requestHeader,
    });
  }

  checkToken(token: string | null): Observable<Boolean> {
    return this.httpclient.get<any>(`${this.apiURL}/api/auth/forgot-password?token=${token}`)
      .pipe<Boolean>(map((data: any) => data));
  }

  public forUser() {
    return this.httpclient.get(this.apiURL + '/api/test/user', {
      responseType: 'text',
    });
  }


  public forAdmin() {
    return this.httpclient.get(this.apiURL + '/api/test/admin', {
      responseType: 'text',
    });
  }

  // @ts-ignore
  public roleMatch(allowedRoles: string | any[]): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i] === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
  }
}
