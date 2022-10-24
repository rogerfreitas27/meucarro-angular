import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarroDto } from '../model/carroDto';
import { CarroDtoPage } from '../model/carroDtoPage';
import { CarroService } from '../service/carro.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  carros: Array<CarroDto> = [];
  pag!: CarroDtoPage;
  page = 0;
  count = 0;
  pageSize = 0;
  totalPages = 0;
  title: string = "";
  responsiveP: boolean = true;
  spinner: boolean = true;



  constructor(private carroService:CarroService,private toast : ToastrService,
    private router: Router,private  toastr : ToastrService ) { }

  ngOnInit(): void {
  this.carregarCarros(this.page);
  }


  carregarCarros(page: number) {
    this.carroService.findAll(page).subscribe(res => {
      this.pag = res;
      this.count = this.pag.totalElements;
      this.carros = this.pag.content;
	  
	    this.totalPages = this.pag.totalPages;
      this.spinner = false;


    },
      (error: any) => {
      this.spinner = false;
      this.toast.error(error);
  
        }

  )}

  carregarMais(pagina: number) { this.carregarCarros(pagina - 1); }

  deletarCarro(id: any){
    if (confirm("Tem certeza que deseja excluir este Carro ?")) {      
        this.carroService.delete(id).subscribe(                  
          res => {
		 this.carregarCarros(this.page-1);
		  
		  },(error: any) => {
       
    this.toastr.error(error);

      });
	  	
    } 

  }
  
mensagem(){
alert("Ops !! Me desculpe, se eu tiver oportunidade esta funcionalidade será implementada ");
}



  
}

