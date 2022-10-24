import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Modelo } from '../model/modelo';
import { ModeloPage } from '../model/modeloPage';
import { ModeloService } from '../service/modelo.service';

@Component({
  selector: 'app-modelo',
  templateUrl: './modelo.component.html',
  styleUrls: ['./modelo.component.css']
})
export class ModeloComponent implements OnInit {

  modelos: Array<Modelo> = [];
  pag!: ModeloPage;
  page = 0;
  count = 0;
  pageSize = 0;
  totalPages = 0;
  title: string = "";
  responsiveP: boolean = true;
  spinner: boolean = true;
   



  constructor(private modeloService:ModeloService,private toast : ToastrService,
              private router: Router,private  toastr : ToastrService ) { }

  ngOnInit(): void {
  this.carregarModelos(this.page);
  }


  carregarModelos(page: number) {
    this.modeloService.findAll(page).subscribe(res => {
      this.pag = res;
      this.count = this.pag.totalElements;
      this.modelos = this.pag.content;
	    this.totalPages = this.pag.totalPages;
      this.spinner = false;


    },
      err  => this.spinner = false

  )}



  carregarMais(pagina: number) { this.carregarModelos(pagina - 1); }

  deletarModelo(id: any){
    if (confirm("Tem certeza que deseja excluir este modelo ?")) {      
        this.modeloService.delete(id).subscribe(                  
          res => {
		 this.carregarModelos(this.page);
		  
		  },(error: any) => {
       
    this.toastr.error(error);

      });
	  	
    } 
      
    }
}
