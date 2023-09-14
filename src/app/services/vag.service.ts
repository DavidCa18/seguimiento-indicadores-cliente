import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vag } from '../models/vag';
import { Departamento } from '../models/departamento';
import { environment } from '../../environments/environment.prod';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class VagService {

  private opcionesUrl1 =  environment.base_url + '/vag';

  constructor(private http: HttpClient) { }

  getOpciones(): Observable<Vag[]> {
    return this.http.get<Vag[]>(`${this.opcionesUrl1}/todos`);
  }
  
  getDepartamentos(campus: string): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(`${this.opcionesUrl1}/departamento?campus=${campus}`);
  }  

  getVagId(id: string): Observable<Vag> {
    const url = `${this.opcionesUrl1}/${id}`;
    return this.http.get<Vag>(url);
  }

  addOpcion (vag: Vag): Observable<Vag> {
    return this.http.post<Vag>(this.opcionesUrl1, vag, httpOptions);
  }

  updateOpcion (vag: Vag): Observable<any> {
    return this.http.put(this.opcionesUrl1, vag, httpOptions);
  }

  deleteOpcion (id: string): Observable<Vag> {
    return this.http.delete<Vag>(this.opcionesUrl1+id, httpOptions);
  }

}