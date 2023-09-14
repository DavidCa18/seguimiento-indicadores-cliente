import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { Iasa } from '../models/iasa';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class IasaService {

  private opcionesUrl1 =  environment.base_url + '/iasa'; 

  constructor(private http: HttpClient) { }

  getOpciones(): Observable<Iasa[]> {
    return this.http.get<Iasa[]>(`${this.opcionesUrl1}/todos`);
  }
  
  getDepartamentos(gasto: string, extension: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.base_url}/gastoCorriente/filtros?tipoGasto=${gasto}&extension=${extension}`);
  }  

  getIasaId(id: string): Observable<Iasa> {
    const url = `${this.opcionesUrl1}/${id}`;
    return this.http.get<Iasa>(url);
  }

  addOpcion (iasa: Iasa): Observable<Iasa> {
    return this.http.post<Iasa>(this.opcionesUrl1, iasa, httpOptions);
  }

  updateOpcion (iasa: Iasa): Observable<any> {
    return this.http.put(this.opcionesUrl1, iasa, httpOptions);
  }

  deleteOpcion (id: string): Observable<Iasa> {
    return this.http.delete<Iasa>(this.opcionesUrl1+id, httpOptions);
  }

}