import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaCategoria } from '../interfaces/interfaces';
import { environment } from '../../environments/environment.prod';
const URL =  environment.url;

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  paginaCategorias = 0;

  constructor( private http: HttpClient) { }

  getCategorias(){
    this.paginaCategorias=1;
    return this.http.get<RespuestaCategoria>(`${ URL }/categoria/?pagina=${ this.paginaCategorias }`);
  }
}
