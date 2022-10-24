import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Marca } from 'src/app/model/marca';
import { Modelo } from 'src/app/model/modelo';
import { MarcaService } from 'src/app/service/marca.service';
import { ModeloService } from 'src/app/service/modelo.service';

@Component({
  selector: 'app-form-modelo',
  templateUrl: './form-modelo.component.html',
  styleUrls: ['./form-modelo.component.css']
})
export class FormModeloComponent implements OnInit {
  titulo : string="";
  form_Modelo!: FormGroup;
  idModelo!: number;
  marcas : Marca[]=[];
  spinner: boolean = false;
  modelo! : Modelo  ;
    constructor( private router: Router, private route: ActivatedRoute,
                 private marcaService : MarcaService,private toast : ToastrService,
                 private modeloService : ModeloService) { }

  ngOnInit(): void {
    this.carregarMarcas();
    this.verificaSeUrlTemParametro() ;
  }

  verificaSeUrlTemParametro() {



    this.carregarFormularioDeModelo();

    this.route.params.subscribe(params => {

      if (params.id) {

        this.idModelo = params.id;
        this.titulo = "Editar Modelo";
       this.buscarModeloPorId(this.idModelo);

      }

      else
        this.titulo = "Cadastrar Modelo";

    });



  }

  carregarFormularioDeModelo() {
    this. form_Modelo  = new FormGroup({
      id: new FormControl('', []),
      marca_id: new FormControl('', [Validators.required]),
      nome: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
      valor_fipe: new FormControl('', [Validators.required])
    });
  }


  carregarMarcas(){
    this.marcaService.findAllList()
    .subscribe(marcas =>{  this.marcas = marcas; },
       (error: any) => {this.toast.error(error); }
    );

  }


  buscarModeloPorId(id:number){

   
    this.modeloService.findByMarca(id).subscribe(resposta => {
      this.modelo = resposta;
      this.setarDadosDeMarca(this.modelo);
      this.spinner = false;
    },(error: any) => {
      this.spinner = false;
      this.toast.error(error);
  
        });
      

  }

  setarDadosDeMarca(modelo: Modelo) {  
    this.form_Modelo.patchValue({
     id: modelo.id,
     marca_id:modelo.marca_id.id,
     nome: modelo.nome,
     valor_fipe:modelo.valor_fipe.toLocaleString('pt-br', {minimumFractionDigits: 2})
    });
 }


 onSubmit() { 
 
  let marca :  Marca ={
    id : this.form_Modelo.value.marca_id,
    nome_marca:""};
  

  if(this.form_Modelo.value.id==null || this.form_Modelo.value.id==""){
    var modelo: Modelo = {
      marca_id: marca,
      valor_fipe :this.form_Modelo.value.valor_fipe.replace(/,/g, ""),
      nome: this.form_Modelo.value.nome        
    };
	
    this.save(modelo);
    return ;}
  else
  var modelo: Modelo = {
    id : this.form_Modelo.value.id,
    marca_id: marca,
    valor_fipe : this.form_Modelo.value.valor_fipe.replace(/,/g, ""),
    nome: this.form_Modelo.value.nome     
  };   
 
  this.update(modelo);
  
  }





 save(modelo : Modelo){
  this.modeloService.save(modelo).subscribe(resposta => 
  {/*this.toast.success('Cadastro realizado com sucesso','Sucesso')*/}
  ,(error: any) => {this.toast.error(error); }
  );
}


update(modelo : Modelo){
  this.modeloService.update(modelo).subscribe(resposta =>{
  this.toast.success('Alteração realizada com sucesso','Sucesso')},
    (error: any) => {this.toast.error(error);}
    );
}






  get id() { return this. form_Modelo.get('id')!; }
  get  marca_id() { return this. form_Modelo.get('marca_id')!; }
  get  nome() { return this. form_Modelo.get('nome')!; }
  get  valor_fipe() { return this. form_Modelo.get('valor_fipe')!; }
}
