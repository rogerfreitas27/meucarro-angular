import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Marca } from 'src/app/model/marca';
import { MarcaPage } from 'src/app/model/marcaPage';


@Injectable({
  providedIn: 'root'
})
export class MarcaService {


    private readonly API = environment.API + 'api/marca/';


    httpOptions: Object = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text'
    };
  
    constructor(private http: HttpClient) { }

    

    save(marca: Marca): Observable<Marca> {
        return this.http.post<Marca>(this.API, marca, this.httpOptions);    
      }    
    
      findAll(page: number): Observable<MarcaPage> {
         return this.http.get<MarcaPage>(this.API + '?page=' + page);
      }
    
    
      findByMarca(id: number): Observable<Marca> {
        return this.http.get<Marca>(this.API + id);    
      }
    
    
      update(marca: Marca): Observable<Marca> {
        return this.http.put<Marca>(this.API, marca, this.httpOptions);
      }
    
      delete(id: number) {
        return this.http.delete(this.API + id);    
      }


      findAllList(): Observable<Marca[]> {
        return this.http.get<Marca[]>(this.API + 'findAll');
     }
}