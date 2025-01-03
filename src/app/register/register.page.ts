import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AlertController, LoadingController } from '@ionic/angular';
import { UserService } from '../services/userr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  user: string = '';
  password: string = '';

  constructor(
    private storage: Storage,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private userService: UserService
  ) {
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

    // Establecer el usuario en UserService
    await this.userService.setUser(this.user);

    // Agregar asignaturas al usuario directamente
    const asignaturasArray = ['PGY4121', 'ASY4131', 'CSY4111'];
    for (const asignatura of asignaturasArray) {
      await this.userService.addAsignatura(asignatura);
    }

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

  async loading2(){
    const loading = await this.loadingController.create({
      message: 'Cargando...',
      spinner: 'bubbles',
      duration: 500
    });
    
    await loading.present();
  }
}
