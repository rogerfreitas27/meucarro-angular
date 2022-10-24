

export interface  CarroDto{ 
    id?:number;
    marca_id?:number;
    marca_nome?: string;
    modelo_id:number;
    nome_modelo?: string;
    ano:number;
    combustivel:string;
    num_portas:number;
    valor_fipe?:number;
    cor:string;
    timestamp_cadastro:string;


}