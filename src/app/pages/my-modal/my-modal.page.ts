import { Component, OnInit, Input } from '@angular/core';
import { Categoria, Post } from '../../interfaces/interfaces';
import { CategoriasService } from '../../services/categorias.service';
import { PassService } from '../../services/pass.service';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';
import { UiServiceService } from '../../services/ui-service.service';
import { ModalController } from '@ionic/angular';
import { Clipboard } from '@capacitor/clipboard';

@Component({
  selector: 'app-my-modal',
  templateUrl: './my-modal.page.html',
  styleUrls: ['./my-modal.page.scss'],
})
export class MyModalPage implements OnInit {

  @Input() post: Post;
  data: Post;

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

  postCrear: any = {
    _id: 'id',
    categoria: {
      _id:'60999ddadf65b347901f8272'
    },
    imagen: 'amazon.png',
    cuenta: '',
    passSecure: '',
    descripcion: '',
  };

  showPassword = false;
  passwordToggleIcon = 'eye';
  constructor( private categoriaService: CategoriasService,
               public modalController: ModalController,
               private passService: PassService,
               private postsService: PostsService,
               private route: Router,
               private uiService: UiServiceService ) {}

  ngOnInit(): void {
    this.data = this.post;
    this.postCrear._id = this.post._id;
    this.postCrear.categoria._id = this.post.categoria['_id'];
    this.postCrear.imagen = this.post.imagen;
    this.postCrear.passSecure = this.post.passSecure;
    this.postCrear.descripcion = this.post.descripcion;
    this.postCrear.cuenta = this.post.cuenta;
    this.traerCategorias();
  }

  traerCategorias(){
    this.categoriaService.getCategorias()
      .subscribe( resp => {
        this.categorias.push( ...resp.categorias );
      });
  }

  togglePassword(): void{
    this.showPassword = !this.showPassword;
    if( this.passwordToggleIcon === 'eye'){
      this.postCrear.passSecure = this.passService.decrypt(this.postCrear.passSecure);
      this.passwordToggleIcon = 'eye-off';
    } else {
      this.postCrear.passSecure = this.passService.encrypt(this.postCrear.passSecure);
      this.passwordToggleIcon = 'eye';
    }
  }

  async copy(){
    if( this.passwordToggleIcon === 'eye'){
      this.postCrear.passSecure = this.passService.decrypt(this.postCrear.passSecure);
      this.passwordToggleIcon = 'eye-off';
    }
    const textToCopy = this.post.passSecure;
    // Navegador
    // navigator.clipboard.writeText(textToCopy)
    //   .then(() => { this.uiService.presentToast('Se ha copiado al portapapeles correctamente'); })
    //   .catch((error) => { this.uiService.alertaInformativa(`Fallo al copiar ${error}`) })
    //Android
    // this.clipboard.copy(textToCopy)
    //   .then(() => { this.uiService.presentToast('Se ha copiado al portapapeles correctamente'); })
    //   .catch((error) => { this.uiService.alertaInformativa(`Fallo al copiar ${error}`) });
    //   this.post.passSecure = this.passService.encrypt(this.post.passSecure);
    //Android Capacitor
    // eslint-disable-next-line id-blacklist
    await Clipboard.write({string: textToCopy})
      .then(() => { this.uiService.presentToast('Se ha copiado al portapapeles correctamente'); })
      .catch((error) => { this.uiService.alertaInformativa(`Fallo al copiar ${error}`); });
    // if( this.passwordToggleIcon == 'eye-off'){
    //   this.postCrear.passSecure = this.passService.encrypt(this.postCrear.passSecure);
    //   this.passwordToggleIcon = 'eye'
    // }
  }

  async genPass(){
    const passGen = await this.passService.getPass();
    this.postCrear.passSecure = this.passService.finalpass;
  }

  async modificar(){
    if( this.passwordToggleIcon === 'eye-off'){
      this.showPassword = !this.showPassword;
      this.postCrear.passSecure = this.passService.encrypt(this.postCrear.passSecure);
    }

    if( this.postCrear.categoria._id === '' || this.postCrear.imagen  === ''
    || this.postCrear.passSecure  === '' || this.postCrear.descripcion  === '' || this.postCrear.cuenta === ''){
      console.log(this.postCrear);
      this.uiService.alertaInformativa('Llene todos los campos');
      return;
    }

    const modificar = await this.postsService.modificarPost( this.postCrear );
    if ( modificar ) {
      this.post.categoria['_id'] = this.postCrear.categoria._id;
      this.post.imagen = this.postCrear.imagen;
      this.post.passSecure = this.postCrear.passSecure;
      this.post.descripcion = this.postCrear.descripcion;
      this.post.cuenta = this.postCrear.cuenta;
      this.uiService.presentToast( 'Se ha modificado correctamente');
    } else {
      this.uiService.presentToast( 'No se pudo modificar');
    }
    this.dismissModal();

  }

  dismissModal() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  cancelar(){
    this.post = this.data;
  }

}
