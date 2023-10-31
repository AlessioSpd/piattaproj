import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IProdotto } from '../models/IProdotto';

@Injectable({
  providedIn: 'root'
})
export class SearchPageService {

  path: string = "http://localhost:8080"

  constructor(private http: HttpClient) {}

  getListaProdotti(searchValue: string) {
    if(searchValue == '')
      return this.http.get<Array<IProdotto>>(this.path + "/prodotti/tutti_prodotti")
    else {
      let params = new HttpParams();
      params = params.set('nome', searchValue);
      return this.http.get<Array<IProdotto>>(this.path + "/prodotti/ricerca_per_nome", { params })
    }
  }
}