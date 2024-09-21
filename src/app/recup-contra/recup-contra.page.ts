import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recup-contra',
  templateUrl: './recup-contra.page.html',
  styleUrls: ['./recup-contra.page.scss'],
})
export class RecupContraPage implements OnInit {
  username: string = '';
  password: string = '';
  message: string = '';
  isVisible: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  validateLogin() {
    if (this.username === 'admin') {
      this.password,
      this.isVisible = !this.isVisible;
    } else {
      this.message = 'Por favor ingrese credenciales validas';
    }
  }

}
