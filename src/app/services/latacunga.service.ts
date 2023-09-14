import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Latacunga } from '../models/latacunga';
import { Departamento } from '../models/departamento';
import { environment } from '../../environments/environment.prod';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })

export class LatacungaService {

  private opcionesUrl1 =  environment.base_url + '/latacunga'; 

  constructor(private http: HttpClient) { }

  getOpciones(): Observable<Latacunga[]> {
    return this.http.get<Latacunga[]>(`${this.opcionesUrl1}/todos`);
  }
  
  getDepartamentos(campus: string): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(`${this.opcionesUrl1}/departamento?campus=${campus}`);
  }
  
  getLatacungaId(id: string): Observable<Latacunga> {
    const url = `${this.opcionesUrl1}/${id}`;
    return this.http.get<Latacunga>(url);
  }
  
  addOpcion (latacunga: Latacunga): Observable<Latacunga> {
    return this.http.post<Latacunga>(this.opcionesUrl1, latacunga, httpOptions);
  }

  updateOpcion (latacunga: Latacunga): Observable<any> {
    return this.http.put(this.opcionesUrl1, latacunga, httpOptions);
  }

  deleteOpcion (id: string): Observable<Latacunga> {
    return this.http.delete<Latacunga>(this.opcionesUrl1+id, httpOptions);
  }

}