import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, IonSegment } from '@ionic/angular';
import { Post, Categoria } from '../../interfaces/interfaces';
import { PostsService } from '../../services/posts.service';
import { CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  @ViewChild(IonSegment, { static: true }) segment: IonSegment;
  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;

  posts: Post[] = [];
  categorias: Categoria[] = [];
  textoBuscar = '';
  buscando = false;

  habilitado = true;
  constructor( private postService: PostsService,
               private categoriaService: CategoriasService ) {}

  ngOnInit(){
    this.traerCategorias();
    this.segment.value = '';

    this.siguientes(false);
    this.postService.nuevoPost.subscribe( post => {
      this.posts.unshift( post );
    });
  }

  recargar( event ) {
    this.siguientes( event, true);
    this.habilitado = true;
    this.posts = [];
  }

  siguientes( event?, pull: boolean =false ){

    this.postService.getPosts( pull, this.segment.value)
      .subscribe( resp => {
        this.posts.push( ...resp.posts );

        if ( event ) {
          event.target.complete();

          if ( resp.posts.length === 0){
            this.habilitado = false;

          }
        }

    });

  }

  traerCategorias(){
    this.categoriaService.getCategorias()
      .subscribe( resp => {
        this.categorias.push( ...resp.categorias );
      });
  }

  cambioCategoria( ){
    this.posts = [];
    this.siguientes(false, true);
  }

  buscar( event ){
    const valor: string = event.detail.value;
    if (valor.length === 0){
      this.buscando = false;
      this.siguientes( false, true);
      this.habilitado = true;
      this.posts = [];
      return;
    }
    this.buscando = true;
    this.postService.buscarPosts( valor )
      .subscribe( resp => {
        this.posts = resp['results'];
        this.buscando = false;
      });
  }

}
