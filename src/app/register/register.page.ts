import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  user: string = '';      
  password: string = '';  

  constructor(private storage: Storage, private alertController: AlertController) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  // Función que se ejecuta al hacer clic en "Registrar"
  async register() {
    if (this.user.trim() === '' || this.password.trim() === '') {
      this.showAlert('Error', 'Por favor, rellena todos los campos.');
      return;
    }

    // Obtener la lista de usuarios almacenados
    let users = await this.storage.get('users');
    if (!users) {
      users = [];
    }

    // Verificar si el nombre de usuario ya está registrado
    const userExists = users.find((u: any) => u.user === this.user);
    if (userExists) {
      this.showAlert('Error', 'El nombre de usuario ya está en uso.');
      return;
    }

    // Añadir el nuevo usuario a la lista
    users.push({ user: this.user, password: this.password });
    await this.storage.set('users', users);

    // Mostrar una alerta de éxito
    this.showAlert('Éxito', 'Usuario registrado correctamente.');

    // Limpiar los campos después de registrar
    this.user = '';
    this.password = '';
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
