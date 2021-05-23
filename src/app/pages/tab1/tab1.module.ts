import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { ComponentsModule } from '../../components/components.module';
import { MyModalPageModule } from '../my-modal/my-modal.module';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    Tab1PageRoutingModule,
    MyModalPageModule
  ],
  declarations: [
    Tab1Page, 
  ],

})
export class Tab1PageModule {}
