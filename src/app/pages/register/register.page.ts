import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { IonSegment } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  @ViewChild(IonSegment, {static:true}) segment: IonSegment;

  registerUser: FormGroup = this.fb.group({
    nombre :  ['Test 1', [ Validators.required, Validators.minLength(2) ]],
    email:  ['test1@test.com', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') ]],
    pass :  ['A123456.', [ Validators.required, Validators.minLength(8) ]],
  });

  constructor( private fb: FormBuilder,
               private usuarioSerice: UsuarioService ) { 
    this.crearForm();
  }

  ngOnInit() {
    this.segment.value = 'login';
  }

  segmentChanged(ev) {
    const valorSegmento = ev.detail.value;
  }

  get nombreNoValido() {
    return this.registerUser.get('nombre')?.invalid && this.registerUser.get('nombre')?.touched;
  }
  get emailNoValido() {
    return this.registerUser.get('email')?.invalid && this.registerUser.get('email')?.touched;
  }
  get passNoValida() {
    return this.registerUser.get('pass')?.invalid && this.registerUser.get('pass')?.touched;
  }


  crearForm() {
    this.registerUser = this.fb.group({
      nick :  ['', [ Validators.required, Validators.minLength(2) ]],
      email:  ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') ]],
      pass :  ['', [ Validators.required, Validators.minLength(8) ]],
    });
  }

  async registro() {
    if ( this.registerUser.invalid ) {
      return Object.values( this.registerUser.controls ).forEach( control => {
        control.markAsTouched();
      });
    }
    delete this.registerUser['pass2'];
    this.registerUser.reset();
  }

}
