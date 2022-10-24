import { Injectable, NgModule } from '@angular/core';
import { HttpInterceptor, HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import  {  ToastrService  }  from  'ngx-toastr' ;



@Injectable()
export class HeaderInterceptorService implements HttpInterceptor {
 

  intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {

    console.log(req);
    return next.handle(req).pipe(

      tap((event: HttpEvent<any>) => {

        if (event instanceof HttpResponse && (event.status === 201)) {
          this.toastr.success('Cadastro realizado com sucesso','Sucesso');
        }else 

        if (event instanceof HttpResponse && (event.status === 204)) {
          this.toastr.info('Cadastro excluido com sucesso','Exclusão');
        }


       })

      , catchError(this.processaError)) as Observable<HttpEvent<any>>;




  }

  constructor(private  toastr : ToastrService) { }


  processaError(error: HttpErrorResponse) {
    let errorMessage = 'Erro desconhecido';
    if (error.error instanceof ErrorEvent) {
      console.error(error.error);
      errorMessage = 'Error: ' + error.error.error;

    } else {
      errorMessage = `Código do erro: ${error.status}, ` + `mensagem: ${error.error}`;

    }
     
    return throwError(errorMessage);

  }


  





}

@NgModule({
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HeaderInterceptorService,
    multi: true,
  },
  ],
})

export class HttpInterceptorModule {

}
