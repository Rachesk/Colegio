import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/userr.service';
import { AnimationController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
})
export class AttendancePage implements OnInit {
  @ViewChild('appLogo', { static: false }) appLogo!: ElementRef;
  @ViewChild('titulo', { static: true }) titulo!: ElementRef;

  animateLogo = false;

  username: string = '';

  constructor(
    private userService: UserService,
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

  async ngOnInit() {
    this.username = await this.userService.getUser();
  }

  async loading2() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
      spinner: 'bubbles',
      duration: 500
    });

    await loading.present();
  }
}
