import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Indice} from '../models/indices';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class IndicesService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http : HttpClient) { }

  getIndices(): Observable<Indice[]>{
    return this.http.get<Indice[]>(this.API_URI+'/indice')
  }
 

  getIndice(id: string): Observable<Indice>{
     return this.http.get<Indice>(this.API_URI+'/indice/'+id)
  }

  deleteIndice(id: string): Observable<Indice>{
    return this.http.delete<Indice>(this.API_URI+'/indice/'+id)
 }

  saveIndice(indice : Indice): Observable<Indice>{
    return this.http.post<Indice>(this.API_URI+'/indice',indice);
  }

  updateIndice(id: string|number, updateIndice : Indice) : Observable<Indice>{
    return this.http.put<Indice>(this.API_URI+'/indice/'+id,updateIndice);
  }

}
