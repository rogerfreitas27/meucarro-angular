import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Marca } from 'src/app/model/marca';
import { MarcaService } from 'src/app/service/marca.service';


@Component({
  selector: 'app-form-marca',
  templateUrl: './form-marca.component.html',
  styleUrls: ['./form-marca.component.css']
})
export class FormMarcaComponent implements OnInit {
  titulo : string="";
  formMarca!: FormGroup;
  idMarca!: number;
  spinner: boolean = false;
 
  constructor( private router: Router, private route: ActivatedRoute,
               private marcaService : MarcaService,
               private toast : ToastrService
                 ) { }
  ngOnInit(): void {
    this.verificaSeUrlTemParametro();
  }



  verificaSeUrlTemParametro() {



    this.carregarFormularioDeMarca();

    this.route.params.subscribe(params => {

      if (params.id) {

        this.idMarca = params.id;
        this.titulo = "Editar Marca";
       this.buscarMarcaPorId(this.idMarca);

      }

      else
        this.titulo = "Cadastrar Marca";



    });



  }

  carregarFormularioDeMarca() {
    this.formMarca  = new FormGroup({
      id: new FormControl('', []),
      nome_marca: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(255)])
      });
  }



  buscarMarcaPorId(id:number){

    let marca;
    this.marcaService.findByMarca(id).subscribe(resposta => {
      marca = resposta;
      this.setarDadosDeMarca(marca);
      this.spinner = false;
    },(error: any) => {
      this.spinner = false;
      this.toast.error(error);
  
        });
      

  }


  setarDadosDeMarca(marca: any) {
  
     this.formMarca.patchValue({
      id: marca.id,
      nome_marca: marca.nome_marca
     });
  }

  onSubmit() {                      

if(this.formMarca.value.id==null || this.formMarca.value.id==""){
  var marca: Marca = {
    nome_marca: this.formMarca.value.nome_marca    
  };
  this.save(marca);
  return ;}
else
var marca: Marca = {
  id : this.formMarca.value.id,
  nome_marca: this.formMarca.value.nome_marca    
};

this.update(marca);

}

save(marca : Marca){
  this.marcaService.save(marca).subscribe(resposta => 
  {/*this.toast.success('Cadastro realizado com sucesso','Sucesso')*/}
  ,(error: any) => {
       
    this.toast.error(error);

      });
}


update(marca : Marca){
  this.marcaService.update(marca).subscribe(resposta =>{
  this.toast.success('Alteração realizada com sucesso','Sucesso')},
    (error: any) => {
       
    this.toast.error(error);

      });
}

  get id() { return this.formMarca.get('id')!; }
  get  nome_marca() { return this.formMarca.get('nome_marca')!; }


}
