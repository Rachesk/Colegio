import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsistenciaGeneradorPageRoutingModule } from './asistencia-generador-routing.module';

import { AsistenciaGeneradorPage } from './asistencia-generador.page';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsistenciaGeneradorPageRoutingModule,
    QRCodeModule
  ],
  declarations: [AsistenciaGeneradorPage]
})
export class AsistenciaGeneradorPageModule {}
