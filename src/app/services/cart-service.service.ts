import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_PATH } from '../const/const';
import { IProdotto } from '../models/IProdotto';
import { IProdottoCarrello } from '../models/IProdottoCarrello';


@Injectable({
  providedIn: 'root'
})
export class CartService {

    path = API_PATH + '/carrello';

    constructor(private http: HttpClient) {}

    addItemToCart(codice: number, email: string, quant: number) {
        return this.http.get<IProdotto>(this.path + '/aggiungi_prodotto_nel_carrello', {params: {'email': email, 'codice': codice, 'quantita': quant}});
    }

    getCarelloFromUsermail(userMail: string) {
        return this.http.get<Array<IProdottoCarrello>>(this.path + '/ottieni_carrello', {params: {'email': userMail}});
    }

    clearCart(email: string) {
        return this.http.delete(this.path + '/svuota_carrello', {params: {'email': email}});
    }

    removeItemFromCart(codice: number, email: string) {
        return this.http.delete(this.path + '/elimina_prodotto', {params: {'id': codice, 'email': email}});
    }

    getNProdotti(email: string) {
        return this.http.get<number>(this.path + '/nProdotti', {params: {'email': email}})
    }
}