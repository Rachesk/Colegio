import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'asistencia-generador',
    loadChildren: () => import('./asistencia-generador/asistencia-generador.module').then( m => m.AsistenciaGeneradorPageModule)
  },
  {
    path: 'recup-contra',
    loadChildren: () => import('./recup-contra/recup-contra.module').then( m => m.RecupContraPageModule)
  },  {
    path: 'menu-home',
    loadChildren: () => import('./menu-home/menu-home.module').then( m => m.MenuHomePageModule)
  },

 

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
