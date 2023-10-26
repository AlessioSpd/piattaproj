import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProdotto } from '../models/IProdotto';

@Injectable({
  providedIn: 'root'
})
export class SearchPageService {

  path: string = "localhost:8080"

  constructor(private http: HttpClient) {}

  getListaProdotti() {
    return this.http.get<Array<IProdotto>>(this.path + "/prodotti/tutti_prodotti")
  }
}