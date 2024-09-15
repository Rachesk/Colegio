import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  username: string = '';
  password: string = '';
  message: string = 'Bienvenido';

  constructor(
    private router: Router
  ){

  }

  validateLogin() {
    if (this.username === 'admin' && this.password === '1234') {
      this.message = 'Acceso correcto';
      this.router.navigate(['/index']);
    } else {
      this.message = 'Acceso incorrecto';
    }
  }

}