import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IUser } from '../models/IUser';
import {Md5} from 'ts-md5';
import { API_PATH } from '../const/const';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  md5!: Md5;
  logged: boolean = false;
  loggedMail: string = ''

  constructor(private http: HttpClient) {
    this.md5 = new Md5();
  }

  checkUser(user: IUser) {
    user.nome = 'ale';
    user.cognome = 'spa';
    return this.http.post<boolean>(API_PATH + "/users/checkUser", user);
  }

  userRegistration(user: IUser) {
    console.log("registro dentro")
    return this.http.post<IUser>(API_PATH + "/users/registra_user", user);
  }

  login(email: string) {
    this.loggedMail = email;
    this.logged = true;
  }

  logout(email: string) {
    this.loggedMail = '';
    this.logged = false;
  }

  isLogged() { return this.logged; }
  
  getLoggedEmail() {
    if(this.isLogged()) return this.loggedMail;
    else return '';
  }
}