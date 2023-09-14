import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Unidad } from '../models/unidad.Models';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UnidadDireccionService {

  private opcionesUrl =  environment.base_url + '/unidades'; 
  unidades:Unidad;
  constructor(private http: HttpClient) {
    /* this.cargarStorage(); */
   }

  getUnidades(): Observable<Unidad[]> {
    return this.http.get<Unidad[]>(this.opcionesUrl).pipe(    
      tap((resp:any)=>{
         localStorage.setItem('unidades',resp)
      })
    );
  }

  getUnidad(id: string): Observable<Unidad> {
    const url = `${this.opcionesUrl}/${id}`;
    return this.http.get<Unidad>(url).pipe(
      tap((resp:any)=>{
        /* localStorage.setItem('unidades',resp.unidad) */
      })
    );
  }

  addUnidad (proveedor: Unidad): Observable<Unidad> {
    return this.http.post<Unidad>(this.opcionesUrl, proveedor, httpOptions).pipe(
      tap((resp:any)=>{
      localStorage.setItem('unidades',resp.unidad)

      })
    );
  }
 /*  cargarStorage(){
    this.unidades=JSON.parse(localStorage.getItem('unidades'));

}
  guardarStorage(id:string,unidad:Unidad){
   localStorage.setItem('id',id);
   localStorage.setItem('unidades',JSON.stringify(unidad));
  this.unidades =unidad;

  } */

  deleteUnidad(opcion: Unidad | string): Observable<Unidad> {
    const id = typeof opcion === 'string' ? opcion : opcion._id;
    const url = `${this.opcionesUrl}/${id}`;

    return this.http.delete<Unidad>(url, httpOptions);
  }

  updateUnidad (proveedor: Unidad): Observable<any> {
    return this.http.put(this.opcionesUrl, proveedor, httpOptions);
  }

}