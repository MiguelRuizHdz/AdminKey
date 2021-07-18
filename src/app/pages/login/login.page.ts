import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController, IonSegment } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/interfaces';
import { PassService } from '../../services/pass.service';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal', {static: true}) slides: IonSlides;
  @ViewChild(IonSegment, {static:true}) segment: IonSegment;

  showPassword = false;
  passwordToggleIcon = 'eye';

  loginUser = {
    email: '',
    password: ''
  };

  registerUser: Usuario = {
    email: '',
    password: '',
    nombre: '',
  };

  constructor( private usuarioSerice: UsuarioService,
               private navCtrl: NavController,
               private passService: PassService,
               private uiService: UiServiceService) { }

  ngOnInit() {
    this.segment.value = 'login';
    this.slides.lockSwipes( true );
  }

  togglePassword(): void{
    this.showPassword = !this.showPassword;
    if( this.passwordToggleIcon === 'eye'){
      this.passwordToggleIcon = 'eye-off';
    } else {
      this.passwordToggleIcon = 'eye';
    }
  }

  segmentChanged(ev) {
    const valorSegmento = ev.detail.value;
    if( valorSegmento==='login' ){
      this.slides.lockSwipes( false );
      this.slides.slideTo(0);
      this.slides.lockSwipes( true );
    }else{
      this.slides.lockSwipes( false );
      this.slides.slideTo(1);
      this.slides.lockSwipes( true );
    }
  }

  async login( fLogin: NgForm ){

    if ( fLogin.invalid ) {
      this.uiService.alertaInformativa('Llene todos los campos correctamente');
      return;
    }

    const valido = await this.usuarioSerice.login( this.loginUser.email, this.loginUser.password );

    if ( valido ) {
      // navegar al tabs
      this.navCtrl.navigateRoot( '/main/tabs/tab1', { animated: true } );
    } else {
      // mostrar alerta de usuario y contraseña no son correctos
      this.uiService.alertaInformativa('Usuario y contraseña no son correctos.');
    }

  }

  async registro( fRegistro: NgForm ){

    if ( fRegistro.invalid ) { return; }

    const valido = await this.usuarioSerice.registro( this.registerUser );
    if ( valido ) {
      // navegar al tabs
      this.uiService.alertaInformativa('Registro exitoso');
      this.navCtrl.navigateRoot( '/main/tabs/tab1', { animated: true } );
      this.uiService.presentToast('Bienvenido');
    } else {
      // mostrar alerta de usuario y contraseña no son correctos
      this.uiService.alertaInformativa('Usuario y contraseña no son validos');
    }

  }

  async genPass(){
    const passGen = await this.passService.getPass();
    this.registerUser.password = this.passService.finalpass;
  }
}
