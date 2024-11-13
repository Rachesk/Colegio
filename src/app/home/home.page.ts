import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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
    private authService: AuthService,
    private loadingController: LoadingController
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
      this.router.navigate(['/menu-home']); // Redirigir a la pagina principal
    } else {
      this.showAlert('Error', 'Usuario o contraseña incorrectos.');
    }
  }

  // Funcion para mostrar u ocultar el formulario de cambiar contraseña
  toggleChangePassword() {
    this.isChangingPassword = !this.isChangingPassword;
    // Limpiar campos de cambio de contraseña si se cancela
    if (!this.isChangingPassword) {
      this.userToChangePassword = '';
      this.newPassword = '';
    }
  }

  // Funcin para cambiar la contraseña
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

  // Funcion para mostrar alertas
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async loading(){
    const loading = await this.loadingController.create({
      message: 'Cargando...',
      spinner: 'bubbles'
    });

    await loading.present();

    this.login().then(() => {
      loading.dismiss();
    }).catch(error =>{
      console.error("Error en el proceso de inicio de sesión:", error);
      loading.dismiss()
    });
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
