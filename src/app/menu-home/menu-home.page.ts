import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import {UserService} from '../user.service';
import { LoadingController } from '@ionic/angular';
import { Animation,AnimationController } from '@ionic/angular';


@Component({
  selector: 'app-menu-home',
  templateUrl: './menu-home.page.html',
  styleUrls: ['./menu-home.page.scss'],
})
export class MenuHomePage implements OnInit {
  @ViewChild('appLogo', { static: false }) appLogo!: ElementRef;
  @ViewChild('titulo', { static: true }) titulo!: ElementRef;

  animateLogo = false;

  username: string = '';
  constructor(private userService: UserService,
    private loadingController: LoadingController,
    private animationCtrl: AnimationController
  ) { }

   ngAfterViewInit() {
    setTimeout(() => {
      this.animateLogo = true;

      const animation = this.animationCtrl.create()
      .addElement([this.appLogo.nativeElement,this.titulo.nativeElement])
      .duration(1500)
      .keyframes([
        { offset: 0, transform: 'translateX(-100px)', opacity: '0' },
        { offset: 1, transform: 'translateX(0)', opacity: '1' }
      ]);

      animation.play();
    },500);
  }


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
