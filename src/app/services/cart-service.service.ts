import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { API_PATH } from '../const/const';
import { IProdotto } from '../models/IProdotto';
import { IProdottoCarrello } from '../models/IProdottoCarrello';
import { IOrdine } from '../models/IOrdine';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


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
        return this.http.delete(this.path + '/svuota_carrello', {params: {'email': email}})
    }

    removeItemFromCart(codice: number, email: string) {
        return this.http.delete(this.path + '/elimina_prodotto', {params: {'id': codice, 'email': email}});
    }

    getNProdotti(email: string) {
        return this.http.get<number>(this.path + '/nProdotti', {params: {'email': email}})
    }

    confermaOrdine(email: string) {
        return this.http.get<IOrdine>(API_PATH + '/ordini/crea_ordine', {params: {'email': email}}).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        console.warn(error.headers);
        return throwError('Alcuni prodotti sono stati modificati.');
    }
}