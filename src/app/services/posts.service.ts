import { EventEmitter, Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpUrlEncodingCodec } from '@angular/common/http';
import { RespuestaPosts, Post } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';
import { environment } from '../../environments/environment.prod';
const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  paginaPosts = 0;
  id = '';
  texto = '';
  nuevoPost = new EventEmitter<Post>();

  constructor( private http: HttpClient,
              private usuarioService: UsuarioService,) { }

  getPosts( pull: boolean = false, categoria: string ='' ){

    const headers =  new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    if ( pull ) {
      this.paginaPosts = 0;
    }
    this.paginaPosts++;

    return this.http.get<RespuestaPosts>(`${ URL }/posts/?pagina=${ this.paginaPosts }&categoria=${ categoria }`, {headers} );

  }

  crearPost( post ){

    const headers =  new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return new Promise( resolve => {

      this.http.post(`${ URL}/posts`, post, { headers } )
          .subscribe( resp => {
            this.nuevoPost.emit( resp['post']);
            resolve(true);
      });

    });
  }

  eliminarPost( post ){
    const headers =  new HttpHeaders({
      'x-token': this.usuarioService.token
    });
    this.id = post._id;
    return this.http.delete(`${ URL }/posts/delete/${ this.id }`, {headers} );
  }

  modificarPost( post ) {
    const headers =  new HttpHeaders({
      'x-token': this.usuarioService.token
    });
    this.id = post._id;
    return new Promise( resolve => {

      this.http.post(`${ URL }/posts/update/${ this.id }`, post, { headers })
          .subscribe( resp => {
            if ( resp['ok'] ){
              resolve(true);
            } else {
              resolve(false);
            }
          });
    });
  }

  buscarPosts( texto: string){
    const headers =  new HttpHeaders({
      'x-token': this.usuarioService.token
    });
    this.texto = texto;
    return this.http.get(`${ URL }/buscar/${ this.texto }`, { headers });
  }

}
