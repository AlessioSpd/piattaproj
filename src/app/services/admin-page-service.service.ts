import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IProdotto } from '../models/IProdotto';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {}

  getListaProdotti(searchValue: string, brandCheck: string[]) {
    // this.http.get<Array<IUser>>
  }
}