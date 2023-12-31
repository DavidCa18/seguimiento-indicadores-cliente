import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';
import { Indicadores } from '../models/indicadores';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })

export class IndicadoresService {

  private opcionesUrl1 = environment.base_url + '/indicadores/todos';
  private opcionesUrl = environment.base_url + '/indicadores';

  constructor(private http: HttpClient) { }

  //getOpciones(): Observable<Indicadores[]> {
  //return this.http.get<Indicadores[]>(this.opcionesUrl1)
  //}  

  getOpciones(): Observable<Indicadores[]> {
    return this.http.get<Indicadores[]>(this.opcionesUrl1);
  }

  getUnidadesOpciones1(): Observable<Indicadores[]> {
    return this.http.get<Indicadores[]>(this.opcionesUrl1); //localStorage.setItem('unidades',resp.unidad)
  }

  getIndicadoresId(id: string): Observable<Indicadores> {
    const url = `${this.opcionesUrl}/${id}`;
    return this.http.get<Indicadores>(url);
  }

  getIndicadores(usuario_id: string): Observable<Indicadores[]> {
    return this.http.get<Indicadores[]>(this.opcionesUrl + '/usuario?usuario_id=' + usuario_id);
  }

  addOpcion(proveedor: Indicadores): Observable<Indicadores> {
    return this.http.post<Indicadores>(this.opcionesUrl, proveedor, httpOptions);
  }

  addOpcion2(proveedor: Indicadores): Observable<Indicadores> {
    return this.http.post<Indicadores>(this.opcionesUrl, proveedor, httpOptions);
  }

  deleteOpcion(opcion: Indicadores | string): Observable<Indicadores> {
    const id = typeof opcion === 'string' ? opcion : opcion._id;
    const url = `${this.opcionesUrl}/${id}`;
    return this.http.delete<Indicadores>(url, httpOptions);
  }

  updateOpcion(proveedor: Indicadores): Observable<any> {
    return this.http.put(this.opcionesUrl, proveedor, httpOptions);
  }

  buscarIndicadores(termino: string) {
    let url = `${environment.base_url}/busqueda/coleccion/indicadores/${termino}`;
    return this.http.get(url).pipe(map((resp: any) => resp.indicadores));
  }

  listarIndicadoresRol(role: string) {
    let url = this.opcionesUrl + "/listarIndicadoresRol?role=" + role;
    return this.http.get(url);
  }

  listarIndicadoresusuario(usuario: string) {
    let url = this.opcionesUrl + "/listarIndicadoresUsuario?usuario_id=" + usuario;
    return this.http.get(url);
  }

}