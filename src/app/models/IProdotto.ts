export class IProdotto {
    codice: number;
    nome: string;
    descrizione: string;
    prezzo: number;
    quantita: number;

    constructor(codice: number, nome:string, descrizione: string, prezzo: number, quantita: number) {
        this.codice = codice;
        this.nome = nome;
        this.descrizione = descrizione;
        this.prezzo = prezzo;
        this.quantita = quantita;
    }
}