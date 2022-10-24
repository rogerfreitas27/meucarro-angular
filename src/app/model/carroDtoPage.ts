import { CarroDto } from "./carroDto";

export interface CarroDtoPage {
   
    content: Array<CarroDto>;  
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort?: any;
    numberOfElements: number;
    first: boolean;
}