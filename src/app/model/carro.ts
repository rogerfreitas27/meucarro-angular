import { Modelo } from "./modelo";

export interface  Carro{ 
    id?:number;
    timestamp_cadastro:Date;
    modelo_id: Modelo;
    ano:number;
   combustivel:string;
   num_portas:number;
   cor:string;
   }