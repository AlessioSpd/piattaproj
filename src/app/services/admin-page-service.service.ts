import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IUser } from '../models/IUser';
import { API_PATH } from '../const/const';
import { IProdotto } from '../models/IProdotto';
import { IOrdine } from '../models/IOrdine';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {}

  getAllProduct() {
    return this.http.get<Array<IProdotto>>( API_PATH + "/prodotti/tutti_prodotti");
  }

  getAllUser() {
    return this.http.get<Array<IUser>>(API_PATH + '/users/all_user');
  }

  removeUser(email: string) {
    return this.http.delete(API_PATH + '/users/delete_user_email', {params: {'email': email}});
  }

  searchProduct(value: string) {
    let params = new HttpParams({ fromObject: {
      'nome': value,
      'marche': [].join()
    }})
    return this.http.get<Array<IProdotto>>(API_PATH + '/prodotti/ricerca', {params: params});
  }

  getAllOrderOfUser(email: string) {
    return this.http.get<Array<IOrdine>>(API_PATH + '/ordini/tutti_ordini', {params: {'email': email}});
  }

  deleteProduct(codice: number) {
    return this.http.delete(API_PATH + '/prodotti/elimina_prodotto', {params: {'codice': codice}});
  }

  updateProduct(newProduct: IProdotto) {
    return this.http.put(API_PATH + '/prodotti/update_prodotto', newProduct);
  }

  createProduct(newProduct: IProdotto) {
    return this.http.post(API_PATH + '/prodotti/aggiungi_prodotto', newProduct);
  }
}