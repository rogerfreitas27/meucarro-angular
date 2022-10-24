import { Modelo } from "./modelo";

export interface ModeloPage {
   
    content: Array<Modelo>;  
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort?: any;
    numberOfElements: number;
    first: boolean;
}