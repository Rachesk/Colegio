import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';
import { LoadingController, AlertController } from '@ionic/angular';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

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

  constructor(
    private userService: UserService,
    private loadingController: LoadingController,
    private animationCtrl: AnimationController,
    private alertController: AlertController, // Importamos AlertController
    private router: Router 
  ) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.animateLogo = true;

      const animation = this.animationCtrl.create()
        .addElement([this.appLogo.nativeElement, this.titulo.nativeElement])
        .duration(1500)
        .keyframes([
          { offset: 0, transform: 'translateX(-100px)', opacity: '0' },
          { offset: 1, transform: 'translateX(0)', opacity: '1' }
        ]);

      animation.play();
    }, 500);
  }

  ngOnInit() {
    this.username = this.userService.getUsername();
  }

  async loading2() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
      spinner: 'bubbles',
      duration: 500
    });

    await loading.present();
  }

  // Método para mostrar el mensaje de confirmación
  async confirmLogout() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que deseas cerrar sesion?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Salir',
          handler: () => {
            this.redirectToHome();
          },
        },
      ],
    });

    await alert.present();
  }

  // Método para manejar la redirección
  redirectToHome() {
    // Lógica para redirigir al home
    console.log('Redirigiendo al Home');
    // Aquí puedes usar un Router si lo tienes configurado, como:
     this.router.navigate(['/home']);
  }
}
