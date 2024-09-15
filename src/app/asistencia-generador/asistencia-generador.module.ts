import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsistenciaGeneradorPageRoutingModule } from './asistencia-generador-routing.module';

import { AsistenciaGeneradorPage } from './asistencia-generador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsistenciaGeneradorPageRoutingModule
  ],
  declarations: [AsistenciaGeneradorPage]
})
export class AsistenciaGeneradorPageModule {}
