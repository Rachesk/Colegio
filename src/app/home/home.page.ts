import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

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
    private router: Router
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

    // Obtener usuarios registrados
    const users = await this.storage.get('users');
    if (!users) {
      this.showAlert('Error', 'No hay usuarios registrados.');
      return;
    }

    // Verificar las credenciales
    const validUser = users.find((u: any) => u.user === this.user && u.password === this.pass);
    if (validUser) {
      this.router.navigate(['/menu-home']); // Redirigir a la página principal
    } else {
      this.showAlert('Error', 'Usuario o contraseña incorrectos.');
    }
  }

  // Función para mostrar u ocultar el formulario de cambiar contraseña
  toggleChangePassword() {
    this.isChangingPassword = !this.isChangingPassword;
    // Limpiar campos de cambio de contraseña si se cancela
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

    // Obtener los usuarios registrados
    const users = await this.storage.get('users');
    if (!users) {
      this.showAlert('Error', 'No hay usuarios registrados.');
      return;
    }

    // Buscar el usuario por nombre
    const userIndex = users.findIndex((u: any) => u.user === this.userToChangePassword);
    if (userIndex !== -1) {
      // Cambiar la contraseña del usuario
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
