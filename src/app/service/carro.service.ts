import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarroDto } from 'src/app/model/carroDto';
import {  CarroDtoPage } from 'src/app/model/carroDtoPage';


@Injectable({
  providedIn: 'root'
})
export class CarroService {


    private readonly API = environment.API + 'api/carro/';


    httpOptions: Object = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text'
    };
  
    constructor(private http: HttpClient) { }

    

    save(carroDto: CarroDto): Observable<CarroDto> {
        return this.http.post<CarroDto>(this.API, carroDto, this.httpOptions);    
      }    
    
      findAll(page: number): Observable<CarroDtoPage> {
         return this.http.get<CarroDtoPage>(this.API + '?page=' + page);
      }
    
    
      findByCarro(id: number): Observable<CarroDto> {
        return this.http.get<CarroDto>(this.API + id);    
      }
    
    
      update(carroDto: CarroDto): Observable<CarroDto> {
        return this.http.put<CarroDto>(this.API, carroDto, this.httpOptions);
      }
    
      delete(id: number) {
        return this.http.delete(this.API + id);    
      }
}