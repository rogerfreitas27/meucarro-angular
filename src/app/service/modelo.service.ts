import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Modelo } from 'src/app/model/modelo';
import { ModeloPage } from 'src/app/model/modeloPage';


@Injectable({
  providedIn: 'root'
})
export class ModeloService {


    private readonly API = environment.API + 'api/modelo/';


    httpOptions: Object = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text'
    };
  
    constructor(private http: HttpClient) { }

    

    save(modelo: Modelo): Observable<Modelo> {
        return this.http.post<Modelo>(this.API, modelo, this.httpOptions);    
      }    
    
      findAll(page: number): Observable<ModeloPage> {
         return this.http.get<ModeloPage>(this.API + '?page=' + page);
      }
    
    
      findByMarca(id: number): Observable<Modelo> {
        return this.http.get<Modelo>(this.API + id);    
      }
    
    
      update(marca: Modelo): Observable<Modelo> {
        return this.http.put<Modelo>(this.API, marca, this.httpOptions);
      }
    
      delete(id: number) {
        return this.http.delete(this.API + id);    
      }

      findAllList(): Observable<Modelo[]> {
        return this.http.get<Modelo[]>(this.API + 'findAll');
     } 


     findAllByMarca(id:number): Observable<Modelo[]> {
      return this.http.get<Modelo[]>(this.API + 'findAllByMarca/'+id);
   }





}