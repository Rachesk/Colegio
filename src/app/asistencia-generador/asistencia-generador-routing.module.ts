import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsistenciaGeneradorPage } from './asistencia-generador.page';

const routes: Routes = [
  {
    path: '',
    component: AsistenciaGeneradorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsistenciaGeneradorPageRoutingModule {}
