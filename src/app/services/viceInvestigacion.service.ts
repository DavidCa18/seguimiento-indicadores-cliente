import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ViceInvestigacion } from '../models/viceInvestigacion';
import { Departamento } from '../models/departamento';
import { environment } from '../../environments/environment.prod';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ViceInvestigacionService {

  private opcionesUrl1 =  environment.base_url + '/viceInvestigacion'; 

  constructor(private http: HttpClient) { }

  getOpciones(): Observable<ViceInvestigacion[]> {
    return this.http.get<ViceInvestigacion[]>(`${this.opcionesUrl1}/todos`);
  }
  
  getDepartamentos(campus: string): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(`${this.opcionesUrl1}/departamento?campus=${campus}`);
  }  

  getViceInvestigacionId(id: string): Observable<ViceInvestigacion> {
    const url = `${this.opcionesUrl1}/${id}`;
    return this.http.get<ViceInvestigacion>(url);
  }

  addOpcion (viceInvestigacion: ViceInvestigacion): Observable<ViceInvestigacion> {
    return this.http.post<ViceInvestigacion>(this.opcionesUrl1, viceInvestigacion, httpOptions);
  }

  updateOpcion (viceInvestigacion: ViceInvestigacion): Observable<any> {
    return this.http.put(this.opcionesUrl1, viceInvestigacion, httpOptions);
  }

  deleteOpcion (id: string): Observable<ViceInvestigacion> {
    return this.http.delete<ViceInvestigacion>(this.opcionesUrl1+id, httpOptions);
  }
}
