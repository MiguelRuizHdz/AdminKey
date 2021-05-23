import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
const URL =  environment.url;
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class PassService {

  private  secretKey: string = "thisismyuniqueseedy18hy6";
  private encryptedData: string = ""
  private decryptedData: string = ""
  finalpass: string;

  constructor( private http: HttpClient) { }

  getPass(){
    return new Promise( resolve => {
      this.http.get(`${ URL }/obt/ps`)
        .subscribe(async resp => {
          if ( resp['ok']) {
            this.finalpass=resp['pass'];
            resolve( true );
          } else {
            this.finalpass = null;
            resolve( false );
          }
        });
    });
  };

  encrypt(data:any):string {
    return this.encryptedData = CryptoJS.AES.encrypt( data,  this.secretKey ).toString();
  }

  decrypt( data:any ):string {
    return this.decryptedData = CryptoJS.AES.decrypt( data, this.secretKey).toString(CryptoJS.enc.Utf8);
  }
}
