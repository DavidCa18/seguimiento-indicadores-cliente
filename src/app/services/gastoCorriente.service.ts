import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';
import { GastoCorriente } from '../models/gastoCorriente'; 

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })

export class GastoCorrienteService {

  private opcionesUrl1 =  environment.base_url + '/gastoCorriente/todos'; 
  private opcionesUrl =  environment.base_url + '/gastoCorriente'; 

  constructor(private http: HttpClient) { }

  getOpciones(): Observable<GastoCorriente[]> {
    return this.http.get<GastoCorriente[]>(this.opcionesUrl1) 
  }  

  getGastoCorrienteId(id: string): Observable<GastoCorriente> {
    const url = `${this.opcionesUrl}/${id}`;
    return this.http.get<GastoCorriente>(url);
  }

  getGastoCorriente (usuario_id:string): Observable<GastoCorriente[]> {
    return this.http.get<GastoCorriente[]>(this.opcionesUrl+'?usuario_id='+usuario_id)
  } 

  addOpcion (proveedor: GastoCorriente): Observable<GastoCorriente> {
    return this.http.post<GastoCorriente>(this.opcionesUrl, proveedor, httpOptions);
  }

  addOpcion2 (proveedor: GastoCorriente): Observable<GastoCorriente> {
    return this.http.post<GastoCorriente>(this.opcionesUrl, proveedor, httpOptions);
  }

  deleteOpcion (opcion: GastoCorriente | string): Observable<GastoCorriente> {
    const id = typeof opcion === 'string' ? opcion : opcion._id;
    const url = `${this.opcionesUrl}/${id}`;

    return this.http.delete<GastoCorriente>(url, httpOptions);
  }

  updateOpcion (proveedor: GastoCorriente): Observable<any> {
    return this.http.put(this.opcionesUrl, proveedor, httpOptions);
  }

  buscarGastoCorriente( termino: string ) {
    let url = `${ environment.base_url }/busqueda/coleccion/GastoCorriente/${ termino }`;
    return this.http.get( url ).pipe(map((resp: any) => resp.indicadores ));
  }

}