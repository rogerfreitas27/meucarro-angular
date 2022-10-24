import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NumberValueAccessor } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarroDto } from 'src/app/model/carroDto';
import { Marca } from 'src/app/model/marca';
import { Modelo } from 'src/app/model/modelo';
import { CarroService } from 'src/app/service/carro.service';
import { MarcaService } from 'src/app/service/marca.service';
import { ModeloService } from 'src/app/service/modelo.service';


@Component({
  selector: 'app-form-carro',
  templateUrl: './form-carro.component.html',
  styleUrls: ['./form-carro.component.css']
})
export class FormCarroComponent implements OnInit {
  titulo : string="";
  formCarro!: FormGroup;
  idCarro!: number;
  marcas : Marca[]=[];
  mensagemSelect: boolean = false;
  modelo! : Modelo  ;
  carroDto!: CarroDto
  modelos : Modelo[]=[];
  constructor( private router: Router, private route: ActivatedRoute,
    private marcaService : MarcaService,private toast : ToastrService,
    private modeloService : ModeloService,private carroService:CarroService) { }

  ngOnInit(): void {
  this.carregarMarcas();
  this.carregarModelos();
    this.verificaSeUrlTemParametro();
  }

  verificaSeUrlTemParametro() {



    this.carregarFormularioDeCarro();

    this.route.params.subscribe(params => {

      if (params.id) {

        this.idCarro = params.id;
        this.titulo = "Editar Carro";
       this.buscarCarroPorId(this.idCarro);

      }

      else
        this.titulo = "Cadastrar Carro";



    });



  }



  carregarMarcas(){
    this.marcaService.findAllList()
    .subscribe(marcas =>{  this.marcas = marcas; },
       (error: any) => {this.toast.error(error); }
    );

  }


  carregarModelos(){
    this.modeloService.findAllList()
    .subscribe(modelos =>{  this.modelos = modelos; },
       (error: any) => {this.toast.error(error); }
    );

  }

  carregarModelosPorMarca(e:any){
    this.mensagemSelect = true;
    this.modeloService.findAllByMarca(e.target.value)
    .subscribe(modelos =>{  this.modelos = modelos; },
       (error: any) => {this.toast.error(error); }
    );
    this.mensagemSelect = false;
  }

  carregarFormularioDeCarro() {
    this. formCarro  = new FormGroup({
      id: new FormControl('', []),
      timestamp_cadastro: new FormControl('', [Validators.required]),
      modelo_id: new FormControl('', [Validators.required]),
      marca_id: new FormControl('', [Validators.required]),
      ano: new FormControl('', [Validators.required]),
      combustivel: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
      num_portas: new FormControl('', [Validators.required]),
      cor: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)])
     
    });
  }

  buscarCarroPorId(id:number){   
    this.carroService.findByCarro(id).subscribe(resposta => {
      this.carroDto = resposta;
      this.setarDadosDeCarro(this.carroDto);
         },(error: any) => {
           this.toast.error(error);
  
        });
      

  }


  setarDadosDeCarro(carro: CarroDto) {
 
 let date = new Date(Number(carro.timestamp_cadastro) *1000 );
 
	var dataFormatada = date.toLocaleDateString('pt-br');
	
	this.formCarro.patchValue({
     id: carro.id,
     timestamp_cadastro :dataFormatada ,
     modelo_id:carro.modelo_id,
     marca_id:carro.marca_id,
     ano: carro.ano,
     combustivel : carro.combustivel,
     num_portas : carro.num_portas,
     cor:carro.cor
    });
 }






 onSubmit() { 
  var datestring = this.formCarro.value.timestamp_cadastro;
  var parts = datestring.match(/(\d{2})\/(\d{2})\/(\d{4})/);
  
   var novaData =  new Date(+parts[3], parts[2]-1, +parts[1]);
   
  if(this.formCarro.value.id==null || this.formCarro.value.id==""){    
	
    this.save(this.formCarro,novaData.getTime());
    return ;}
  else 
  this.update(this.formCarro,novaData.getTime());
  console.log();
  }




  save(formulario : any,data :any){    
    var carro: CarroDto = {
      timestamp_cadastro : data,
     modelo_id:formulario.value.modelo_id,
     marca_id:formulario.value.marca_id,
     ano: formulario.value.ano,
     combustivel :formulario.value.combustivel,
     num_portas : formulario.value.num_portas,
     cor:formulario.value.cor        
    };
    this.carroService.save(carro).subscribe(resposta => 
     (error: any) => {this.toast.error(error); }
    );
  }
  
  
  update(formulario : any,data :any){

    var carro: CarroDto = {
      id: formulario.value.id,
      timestamp_cadastro : data,
     modelo_id:formulario.value.modelo_id,
     marca_id:formulario.value.marca_id,
     ano: formulario.value.ano,
     combustivel :formulario.value.combustivel,
     num_portas : formulario.value.num_portas,
     cor:formulario.value.cor        
    };

    this.carroService.update(carro).subscribe(resposta =>{
    this.toast.success('Alteração realizada com sucesso','Sucesso')},
      (error: any) => {this.toast.error(error);}
      );
  }



converterDate(){
try{
  var datestring = this.formCarro.value.timestamp_cadastro;
  var parts = datestring.match(/(\d{2})\/(\d{2})\/(\d{4})/);
  
   var novaData =  new Date(+parts[3], parts[2]-1, +parts[1]);
   }catch (err) {
  alert("Falha ao converter data");
  
}
      
   
   

}

  get id() { return this. formCarro.get('id')!; }
  get   timestamp_cadastro() { return this. formCarro.get('timestamp_cadastro')!; }
  get  modelo_id() { return this. formCarro.get('modelo_id')!; }
  get  marca_id() { return this. formCarro.get('marca_id')!; }
  get   ano() { return this. formCarro.get('ano')!; }
  get  combustivel() { return this. formCarro.get('combustivel')!; }
  get num_portas() { return this. formCarro.get('num_portas')!; }
  get   cor() { return this. formCarro.get('cor')!; }


}
