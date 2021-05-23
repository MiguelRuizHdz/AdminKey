import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post, Categoria } from '../../interfaces/interfaces';
import { CategoriasService } from '../../services/categorias.service';
import { PassService } from '../../services/pass.service';
import { PostsService } from '../../services/posts.service';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page  implements OnInit {
  categorias: Categoria[] = [];

  imagenes = [
    {
      img: 'amazon.png',
      name: 'Amazon'
    },
    {
      img: 'discord.png',
      name: 'Discord'
    },
    {
      img: 'epic.png',
      name: 'Epic Games'
    },
    {
      img: 'facebook.png',
      name: 'Facebook'
    },
    {
      img: 'gmail.png',
      name: 'Gmail'
    },
    {
      img: 'google.png',
      name: 'Google Account'
    },
    {
      img: 'instagram.png',
      name: 'Instagram'
    },
    {
      img: 'mercado-libre.png',
      name: 'Mercado libre'
    },
    {
      img: 'netflix.png',
      name: 'Netflix'
    },
    {
      img: 'outlook.png',
      name: 'Outlook'
    },
    {
      img: 'prime.png',
      name: 'Prime video'
    },
    {
      img: 'shein.png',
      name: 'Shein'
    },
    {
      img: 'snapchat.png',
      name: 'Snapchat'
    },
    {
      img: 'spotify.png',
      name: 'Spotify'
    },
    {
      img: 'twitter.png',
      name: 'Twitter'
    },
  ];

  postCrear: Post = {
    categoria: '60999ddadf65b347901f8272',
    imagen: 'amazon.png',
    cuenta: 'test1@test.com',
    passSecure: '123456',
    descripcion: 'Test 1',
  };
  showPassword = false;
  passwordToggleIcon = 'eye';
  constructor( private categoriaService: CategoriasService,
               private passService: PassService,
               private postsService: PostsService,
               private route: Router,
               private uiService: UiServiceService ) {}

  ngOnInit(): void {
    this.traerCategorias();
  }

  traerCategorias(){
    this.categoriaService.getCategorias()
      .subscribe( resp => {
        this.categorias.push( ...resp.categorias );
      })
  }

  togglePassword(): void{
    this.showPassword = !this.showPassword;
    if( this.passwordToggleIcon == 'eye'){
      this.passwordToggleIcon = 'eye-off'
    } else {
      this.passwordToggleIcon = 'eye'
    }
  }

  copy(){
    const textToCopy = this.postCrear.passSecure;
    navigator.clipboard.writeText(textToCopy)
      .then(() => { this.uiService.presentToast('Se ha copiado al portapapeles correctamente'); })
      .catch((error) => { this.uiService.alertaInformativa(`Fallo al copiar ${error}`) })
  }

  async genPass(){
    var passGen = await this.passService.getPass();
    this.postCrear.passSecure = this.passService.finalpass;
  }

  async crearCuenta(){
    const creado = await this.postsService.crearPost( this.postCrear );

    this.postCrear = {
      categoria: '',
      imagen: '',
      cuenta: '',
      passSecure: '',
      descripcion: '',
    };

    this.route.navigateByUrl('/main/tabs/tab1');

  }
  
}
