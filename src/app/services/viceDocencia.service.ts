import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ViceDocencia } from '../models/viceDocencia';
import { Departamento } from '../models/departamento';
import { environment } from '../../environments/environment.prod';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ViceDocenciaService {

  private opcionesUrl1 =  environment.base_url + '/viceDocencia'; 

  constructor(private http: HttpClient) { }

  getOpciones(): Observable<ViceDocencia[]> {
    return this.http.get<ViceDocencia[]>(`${this.opcionesUrl1}/todos`);
  }
  
  getDepartamentos(campus: string): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(`${this.opcionesUrl1}/departamento?campus=${campus}`);
  }  

  getViceDocenciaId(id: string): Observable<ViceDocencia> {
    const url = `${this.opcionesUrl1}/${id}`;
    return this.http.get<ViceDocencia>(url);
  }

  addOpcion (viceDocencia: ViceDocencia): Observable<ViceDocencia> {
    return this.http.post<ViceDocencia>(this.opcionesUrl1, viceDocencia, httpOptions);
  }

  updateOpcion (viceDocencia: ViceDocencia): Observable<any> {
    return this.http.put(this.opcionesUrl1, viceDocencia, httpOptions);
  }

  deleteOpcion (id: string): Observable<ViceDocencia> {
    return this.http.delete<ViceDocencia>(this.opcionesUrl1+id, httpOptions);
  }

}