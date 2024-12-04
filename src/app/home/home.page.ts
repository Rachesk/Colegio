import { Component, ElementRef, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AlertController, AnimationController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../services/userr.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  @ViewChild('appLogo', { static: false }) appLogo!: ElementRef;
  @ViewChild('titulo', { static: true }) titulo!: ElementRef;

  animateLogo = false;

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
    private userService: UserService,
    private loadingController: LoadingController,
    private animationCtrl: AnimationController
  ) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }


  ngAfterViewInit() {
    setTimeout(() => {
      this.animateLogo = true;

      const animation = this.animationCtrl.create()
      .addElement(this.appLogo.nativeElement)
      .duration(1500)
      .keyframes([
        { offset: 0, transform: 'translateX(-100px)', opacity: '0' },
        { offset: 1, transform: 'translateX(0)', opacity: '1' }
      ]);

      animation.play();
    },500);
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
  isDeletingAccount: boolean = false; // Estado para mostrar/ocultar el formulario
  userToDelete: string = ''; // Almacena el nombre del usuario a eliminar
  passwordToDelete: string = ''; // Almacena la contraseña para confirmar la eliminación
  
  // Inicia el proceso de eliminación de cuenta
  startDeleteAccount() {
    this.isDeletingAccount = true;
  }
  
  // Cancela el proceso de eliminación de cuenta
  cancelDeleteAccount() {
    this.isDeletingAccount = false;
    this.userToDelete = '';
    this.passwordToDelete = '';
  }
  
  // Confirma y elimina la cuenta del usuario
  async confirmDeleteAccount() {
    if (this.userToDelete.trim() === '' || this.passwordToDelete.trim() === '') {
      this.showAlert('Error', 'Por favor, completa todos los campos.');
      return;
    }
  
    const users = await this.storage.get('users');
    if (!users) {
      this.showAlert('Error', 'No hay usuarios registrados.');
      return;
    }
  
    const userIndex = users.findIndex(
      (u: any) => u.user === this.userToDelete && u.password === this.passwordToDelete
    );
  
    if (userIndex !== -1) {
      users.splice(userIndex, 1); // Elimina el usuario de la lista
      await this.storage.set('users', users); // Actualiza el almacenamiento
      this.showAlert('Éxito', 'Cuenta eliminada correctamente.');
      this.cancelDeleteAccount(); // Limpia el formulario y oculta la sección
    } else {
      this.showAlert('Error', 'Usuario o contraseña incorrectos.');
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
