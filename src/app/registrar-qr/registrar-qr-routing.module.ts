import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarQrPage } from './registrar-qr.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarQrPageRoutingModule {}
