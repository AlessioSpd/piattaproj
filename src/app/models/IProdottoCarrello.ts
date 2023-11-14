import { IProdotto } from "./IProdotto";

export class IProdottoCarrello {
    id: number;
    prezzo: number;
    quantita: number;
    prodotto: IProdotto;

    constructor(codice: number, prezzo: number, quantita: number, prodotto: IProdotto) {
        this.id = codice;
        this.prezzo = prezzo;
        this.quantita = quantita;
        this.prodotto = prodotto;
    }
}