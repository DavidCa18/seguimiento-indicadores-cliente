import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SantoDomingo } from '../models/santoDomingo';
import { Departamento } from '../models/departamento';
import { environment } from '../../environments/environment.prod';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SantoDomingoService {

  private opcionesUrl1 =  environment.base_url + '/santoDomingo'; 

  constructor(private http: HttpClient) { }

  getOpciones(): Observable<SantoDomingo[]> {
    return this.http.get<SantoDomingo[]>(`${this.opcionesUrl1}/todos`);
  }
  
  getDepartamentos(campus: string): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(`${this.opcionesUrl1}/departamento?campus=${campus}`);
  }  

  getSantoDomingoId(id: string): Observable<SantoDomingo> {
    const url = `${this.opcionesUrl1}/${id}`;
    return this.http.get<SantoDomingo>(url);
  }

  addOpcion (santoDomingo: SantoDomingo): Observable<SantoDomingo> {
    return this.http.post<SantoDomingo>(this.opcionesUrl1, santoDomingo, httpOptions);
  }

  updateOpcion (santoDomingo: SantoDomingo): Observable<any> {
    return this.http.put(this.opcionesUrl1, santoDomingo, httpOptions);
  }

  deleteOpcion (id: string): Observable<SantoDomingo> {
    return this.http.delete<SantoDomingo>(this.opcionesUrl1+id, httpOptions);
  }  

}