import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Marca } from '../model/marca';
import { MarcaPage } from '../model/marcaPage';
import { MarcaService } from '../service/marca.service';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent implements OnInit {

  marcas: Array<Marca> = [];
  pag!: MarcaPage;
  page = 0;
  count = 0;
  pageSize = 0;
  totalPages = 0;
  title: string = "";
  responsiveP: boolean = true;
  spinner: boolean = true;
   



  constructor(private marcaService:MarcaService,private toast : ToastrService,
              private router: Router,private  toastr : ToastrService ) { }

  ngOnInit(): void {
  this.carregarMarcas(this.page);
  }


  carregarMarcas(page: number) {
    this.marcaService.findAll(page).subscribe(res => {
      this.pag = res;
      this.count = this.pag.totalElements;
      this.marcas = this.pag.content;
	    this.totalPages = this.pag.totalPages;
      this.spinner = false;


    },
      err  => this.spinner = false

  )}



  carregarMais(pagina: number) { this.carregarMarcas(pagina - 1); }

  deletarMarca(id: any){
    if (confirm("Tem certeza que deseja excluir esta marca ?")) {      
        this.marcaService.delete(id).subscribe(                  
          res => {
		 this.carregarMarcas(this.page);
		  
		  },(error: any) => {
       
    this.toastr.error(error);

      });
	  	
    } 
      
    }
  }



  

