export interface Address {

    id: number;
    street: string;
    number: number;
    complement?: string;
    neighborhood: string;
    cep?: string;
    city: string;
    state: string;
}
