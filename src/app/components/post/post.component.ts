import { Component, OnInit, Input } from '@angular/core';
import { ActionSheetController, ModalController, AlertController } from '@ionic/angular';
import { Post } from '../../interfaces/interfaces';
import { UiServiceService } from '../../services/ui-service.service';
import { PassService } from '../../services/pass.service';
import { MyModalPage } from '../../pages/my-modal/my-modal.page'
import { PostsService } from '../../services/posts.service';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  @Input() post: Post = {};

  showPassword = false;
  passwordToggleIcon = 'eye';
  constructor(private actionSheetCtrl: ActionSheetController,
              private alertController: AlertController,
              public modalController: ModalController,
              private passService: PassService,
              private postsService: PostsService,
              private uiService: UiServiceService) { }

  ngOnInit() {
    
  }

  async lanzarMenu(){

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Editar',
          icon: 'create',
          cssClass: 'action-dark',
          handler: () => {
            this.openModal();
          }
        },
        {
          text: 'Borrar',
          icon: 'trash',
          // Cambiar color a rojo
          cssClass: 'danger',
          handler: () => {
            this.borrar();
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          cssClass: 'action-dark',
          role: 'cancel',
          handler: () => {
          }
        }]
    });
    await actionSheet.present();
  }

  async openModal(){
    const modal = await this.modalController.create({
      component: MyModalPage,
      cssClass: 'my-custom-class',
      componentProps: {
        post: this.post
      }
    });
    return await modal.present();
  }
  
  modificar(){    
    this.uiService.presentAlertConfirmAceptar('¿Estas seguro de modificar');
  }
  async borrar(){
    this.presentAlertConfirmEliminar('¿Estas seguro de eliminar?');
  }

  async presentAlertConfirmEliminar( message:string ) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmar',
      message,
      buttons: [
        {
          text: 'No, cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Sí, borrar',
          handler: () => {
            this.postsService.eliminarPost(this.post)
              .subscribe(resp => {
              this.uiService.presentToast('Se ha eliminado correctamente');
            });
          }
        }
      ]
    });

    await alert.present();
  }

  togglePassword(): void{
    this.showPassword = !this.showPassword;
    if( this.passwordToggleIcon == 'eye'){
      this.post.passSecure = this.passService.decrypt(this.post.passSecure);
      this.passwordToggleIcon = 'eye-off'
    } else {
      this.post.passSecure = this.passService.encrypt(this.post.passSecure);
      this.passwordToggleIcon = 'eye'
    }
  }

  copy(){
    this.post.passSecure = this.passService.decrypt(this.post.passSecure);
    const textToCopy = this.post.passSecure;
    navigator.clipboard.writeText(textToCopy)
      .then(() => { this.uiService.presentToast('Se ha copiado al portapapeles correctamente'); })
      .catch((error) => { this.uiService.alertaInformativa(`Fallo al copiar ${error}`) })
      this.post.passSecure = this.passService.encrypt(this.post.passSecure);
    
  }

}
