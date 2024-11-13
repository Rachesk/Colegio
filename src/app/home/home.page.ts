import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  user: string = '';                   
  pass: string = '';                   
  userToChangePassword: string = '';   
  newPassword: string = '';            
  isChangingPassword = false;          

  constructor(
    private storage: Storage, 
    private alertController: AlertController, 
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  // Función para iniciar sesión
  async login() {
    if (this.user.trim() === '' || this.pass.trim() === '') {
      this.showAlert('Error', 'Por favor, rellena todos los campos.');
      return;
    }
  
    const success = await this.authService.login(this.user, this.pass);
    if (success) {
      await this.userService.setUser(this.user); // Guarda el usuario actual en UserService
      this.router.navigate(['/menu-home']); // Redirigir a la página principal
    } else {
      this.showAlert('Error', 'Usuario o contraseña incorrectos.');
    }
  }

  // Función para mostrar u ocultar el formulario de cambiar contraseña
  toggleChangePassword() {
    this.isChangingPassword = !this.isChangingPassword;
    if (!this.isChangingPassword) {
      this.userToChangePassword = '';
      this.newPassword = '';
    }
  }

  // Función para cambiar la contraseña
  async changePassword() {
    if (this.userToChangePassword.trim() === '' || this.newPassword.trim() === '') {
      this.showAlert('Error', 'Por favor, rellena todos los campos.');
      return;
    }

    const users = await this.storage.get('users');
    if (!users) {
      this.showAlert('Error', 'No hay usuarios registrados.');
      return;
    }

    const userIndex = users.findIndex((u: any) => u.user === this.userToChangePassword);
    if (userIndex !== -1) {
      users[userIndex].password = this.newPassword;
      await this.storage.set('users', users); 

      this.showAlert('Éxito', 'Contraseña cambiada exitosamente.');
      this.isChangingPassword = false;
      this.userToChangePassword = '';
      this.newPassword = '';
    } else {
      this.showAlert('Error', 'Usuario no encontrado.');
    }
  }

  // Función para mostrar alertas
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
