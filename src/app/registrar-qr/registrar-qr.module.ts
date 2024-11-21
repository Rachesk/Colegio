import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RegistrarQrPageRoutingModule } from './registrar-qr-routing.module';

import { RegistrarQrPage } from './registrar-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarQrPageRoutingModule
  ],
  declarations: [RegistrarQrPage]
})
export class RegistrarQrPageModule {}
