import { IProdottoCarrello } from "./IProdottoCarrello";
import { IUser } from "./IUser";

export class IOrdine {
    id: number;
    data: string;
    user: IUser;
    carrello: Array<IProdottoCarrello>;
    total_price: number;

    constructor(id: number, data:string, user: IUser, prodotti: Array<IProdottoCarrello>, tp: number) {
        this.id = id;
        this.data = data;
        this.user = user;
        this.carrello = prodotti;
        this.total_price = tp;
    }
}