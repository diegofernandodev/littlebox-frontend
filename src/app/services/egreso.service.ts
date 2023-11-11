import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Egreso } from '../interfaces/egreso';

@Injectable({
  providedIn: 'root'
})
export class EgresoService {
  private myAppUrl: string;
  // private myApiUrl: string;
  private urlGet = ""
  private urlDelete = "";
  private urlPost = "";
  private urlPut = "";
  private urlIpGet = "";
  

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.urlGet = "obtenerTodosLosEgresos"
    this.urlDelete = "eliminarEgreso"
    this.urlPost = "guardarEgreso"
    this.urlPut = "modificarEgreso"
    this.urlIpGet = "obtenerEgreso"
  }

  getListaEgresos(): Observable<Egreso[]> {
   return this.http.get<Egreso[]>(`${this.myAppUrl}${this.urlGet}`);
  }

  deleteEgresos(id: any): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.urlDelete}/${id}`);
  }
  

  saveEgresos(egreso: Egreso): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.urlPost}`,egreso)
  }

  getEgreso(id: any): Observable<Egreso> {
    return this.http.get<Egreso>(`${this.myAppUrl}${this.urlIpGet}/${id}`)
  }

  updateEgreso(id: any, egreso: Egreso): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.urlPut}/${id}`, egreso);
  }
}
