export class IProdotto {
    codice: number;
    nome: string;
    descrizione: string;
    prezzo: number;
    quantita: number;
    marca: string;

    constructor(codice: number, nome:string, descrizione: string, prezzo: number, quantita: number, marca: string) {
        this.codice = codice;
        this.nome = nome;
        this.descrizione = descrizione;
        this.prezzo = prezzo;
        this.quantita = quantita;
        this.marca = marca;
    }
}