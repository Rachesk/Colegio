import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import {UserService} from '../user.service';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-menu-home',
  templateUrl: './menu-home.page.html',
  styleUrls: ['./menu-home.page.scss'],
})
export class MenuHomePage implements OnInit {
  username: string = '';
  constructor(private userService: UserService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.username = this.userService.getUsername();
  }

  async loading2(){
    const loading = await this.loadingController.create({
      message: 'Cargando...',
      spinner: 'bubbles',
      duration: 500
    });
    
    await loading.present();
  }

}
