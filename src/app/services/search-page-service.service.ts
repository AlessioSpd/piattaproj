import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IProdotto } from '../models/IProdotto';

@Injectable({
  providedIn: 'root'
})
export class SearchPageService {

  path: string = "http://localhost:8080"

  constructor(private http: HttpClient) {}

  getListaProdotti(searchValue: string, brandCheck: string[]) {
    
    if(searchValue == '' && brandCheck.length == 0)
      return this.http.get<Array<IProdotto>>(this.path + "/prodotti/tutti_prodotti")
    else {
      if(brandCheck.length == 0) brandCheck.push('')

      // console.log(searchValue +' - ' + brandCheck.join())

      let params =new HttpParams({ fromObject: {
        'nome': searchValue,
        'marche': brandCheck.join()
      }})
      
      return this.http.get<Array<IProdotto>>(this.path + "/prodotti/ricerca", { params })
    }
  }
}