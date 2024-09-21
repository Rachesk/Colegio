import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  username: string = '';
  password: string = '';
  message: string = 'Bienvenido!';

  constructor(
    private router: Router,
    private userService: UserService
  ){

  }

  validateLogin() {
    if (this.username === 'admin' && this.password === '1234') {
      this.message = 'Acceso correcto';
      this.userService.setUsername(this.username);
      this.router.navigate(['/menu-home']);
    } else {
      this.message = 'Acceso incorrecto';
    }
  }

}