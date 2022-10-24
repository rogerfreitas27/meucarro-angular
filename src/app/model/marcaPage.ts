import { Marca } from "./marca";

export interface MarcaPage {
   
    content: Array<Marca>;  
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort?: any;
    numberOfElements: number;
    first: boolean;
}