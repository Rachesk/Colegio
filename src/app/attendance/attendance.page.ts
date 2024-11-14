import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/userr.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
})
export class AttendancePage implements OnInit {
  username: string = '';

  constructor(
    private userService: UserService,
    private loadingController: LoadingController
  ) { }

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
