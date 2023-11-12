export class IUser {
    nome: string ;
    cognome: string;
    email: string;
    password: string;
    role: boolean;

    constructor(nome: string, cognome: string, email: string, password: string, role: boolean) {
        this.nome = nome;
        this.cognome = cognome;
        this.email = email;
        this.password = password;
        this.role = role;
    }    
}