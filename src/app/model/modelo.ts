import { Marca } from "./marca";

export interface  Modelo{ 
    id?:number;
    marca_id: Marca;
    valor_fipe:number;
    nome:string;
   }