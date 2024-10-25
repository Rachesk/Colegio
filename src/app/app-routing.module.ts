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
    path: 'recup-contra',
    loadChildren: () => import('./recup-contra/recup-contra.module').then( m => m.RecupContraPageModule)
  },
  {
    path: 'menu-home',
    loadChildren: () => import('./menu-home/menu-home.module').then( m => m.MenuHomePageModule)
  },
  {
    path: 'registrar-qr',
    loadChildren: () => import('./registrar-qr/registrar-qr.module').then( m => m.RegistrarQrPageModule)
  },  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'noticias',
    loadChildren: () => import('./noticias/noticias.module').then( m => m.NoticiasPageModule)
  },


 

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
