import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { IUser } from '../models/IUser';
import { Md5 } from 'ts-md5';
import { API_PATH } from '../const/const';
import { catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  logged: boolean = false;
  loggedMail: string = '';
  adminMail: string = '';

  constructor(private http: HttpClient) {}

  checkUser(user: IUser) {
    return this.http.post<IUser>(API_PATH + "/users/checkUser", user);
  }

  userRegistration(user: IUser) {
    user.password = Md5.hashStr(user.password);
    return this.http.post<IUser>(API_PATH + "/users/registra_user", user).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError('Errore');
  }

  login(email: string) {
    this.loggedMail = email;
    this.logged = true;
  }

  logout() {
    this.loggedMail = '';
    this.logged = false;
  }

  isLogged() { return this.logged; }
  
  getLoggedEmail() {
    if(this.isLogged()) return this.loggedMail;
    else return '';
  }

  loginAdmin(email: string) {
    this.adminMail = email ;
    this.logged = true;
  }

  isAdminLogged(): boolean {
    return this.adminMail == ''
  }
}