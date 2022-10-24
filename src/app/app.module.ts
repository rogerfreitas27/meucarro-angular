import { NgModule,LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { MarcaComponent } from './marca/marca.component';
import { ModeloComponent } from './modelo/modelo.component';
import { FormCarroComponent } from './home/form-carro/form-carro.component';
import { FormMarcaComponent } from './marca/form-marca/form-marca.component';
import { FormModeloComponent } from './modelo/form-modelo/form-modelo.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotFoundComponent } from './not-found/not-found.component';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { HttpInterceptorModule } from './service/interceptor.service';
import { HeaderInterceptorService } from './service/interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import  {  ToastrModule  }  from  'ngx-toastr' ;
import { MarcaService } from './service/marca.service';
import { ModeloService } from './service/modelo.service';
import { CarroService } from './service/carro.service';
import { SpinnerComponent } from './spinner/spinner.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    MarcaComponent,
    ModeloComponent,
    FormCarroComponent,
    FormMarcaComponent,
    FormModeloComponent,
    NotFoundComponent,
    SpinnerComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HttpClientModule,
    HttpInterceptorModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
    ],
 // entryComponents:[ModalComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR'},
  HttpClientModule,
    HeaderInterceptorService,
    MarcaService,
    ModeloService,
    CarroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
