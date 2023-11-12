import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IProdotto } from '../models/IProdotto';
import { API_PATH } from '../const/const';

@Injectable({
  providedIn: 'root'
})
export class SearchPageService {

  constructor(private http: HttpClient ) {}

  getListaProdotti(searchValue: string, brandCheck: string[]) {
    console.log('e')
    if(searchValue == '' && brandCheck.length == 0)
      return this.http.get<Array<IProdotto>>( API_PATH + "/prodotti/tutti_prodotti")
    else {
      if(brandCheck.length == 0) brandCheck.push('')

      let params =new HttpParams({ fromObject: {
        'nome': searchValue,
        'marche': brandCheck.join()
      }})
      
      return this.http.get<Array<IProdotto>>(API_PATH + "/prodotti/ricerca", { params })
    }
  }
}