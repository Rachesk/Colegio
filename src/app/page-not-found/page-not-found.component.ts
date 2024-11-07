import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent  implements OnInit {

  constructor(private loadingController: LoadingController) { }

  ngOnInit() {}

  async loading2(){
    const loading = await this.loadingController.create({
      message: 'Cargando...',
      spinner: 'bubbles',
      duration: 500
    });
    
    await loading.present();
  }

}
