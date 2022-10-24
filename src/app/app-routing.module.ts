import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormCarroComponent } from './home/form-carro/form-carro.component';
import { HomeComponent } from './home/home.component';
import { FormMarcaComponent } from './marca/form-marca/form-marca.component';
import { MarcaComponent } from './marca/marca.component';
import { FormModeloComponent } from './modelo/form-modelo/form-modelo.component';
import { ModeloComponent } from './modelo/modelo.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '',  component: HomeComponent },
  { path: 'carro',  component: HomeComponent },
  { path: 'form-carro',  component: FormCarroComponent },
  { path: 'form-carro/:id',  component: FormCarroComponent },
  { path: 'marca',  component: MarcaComponent },
  { path: 'form-marca',  component: FormMarcaComponent },
  { path: 'form-marca/:id',  component: FormMarcaComponent },
  { path: 'modelo',  component: ModeloComponent },
  { path: 'form-modelo',  component: FormModeloComponent },
  { path: 'form-modelo/:id',  component: FormModeloComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
