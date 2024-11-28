import { Component } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { UserService } from '../services/userr.service';
import jsQR from 'jsqr';
import { AlertController, LoadingController } from '@ionic/angular';
import { Network } from '@capacitor/network';

@Component({
  selector: 'app-registrar-qr',
  templateUrl: './registrar-qr.page.html',
  styleUrls: ['./registrar-qr.page.scss'],
})
export class RegistrarQrPage {
  result: string = '';

  constructor(
    private userService: UserService,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  async scan(): Promise<void> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
      });

      console.log('Imagen capturada:', image.dataUrl);

      const img = new Image();
      img.src = image.dataUrl!;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) {
          this.result = 'Error al procesar la imagen';
          return;
        }

        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        context.drawImage(img, 0, 0);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const qrData = this.processQRCode(imageData);

        if (qrData) {
          this.result = qrData;
          this.showConfirmationAlert(this.result);
        } else {
          this.result = 'No se detectó ningún código QR';
        }
      };

      img.onerror = () => {
        this.result = 'Error al cargar la imagen';
      };
    } catch (error) {
      console.error('Error al capturar el QR:', error);
      this.result = 'Error al escanear el QR';
    }
  }

  processQRCode(imageData: ImageData): string | null {
    const code = jsQR(imageData.data, imageData.width, imageData.height);
    return code ? code.data : null;
  }

  async showConfirmationAlert(qrInfo: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar Registro',
      message: `¿Deseas registrar este QR?: <strong>${qrInfo}</strong>`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => console.log('Registro cancelado'),
        },
        {
          text: 'Confirmar',
          handler: () => this.storeQRCodeInfo(qrInfo),
        },
      ],
    });

    await alert.present();
  }

  async storeQRCodeInfo(qrInfo: string) {
    try {
      const isConnected = await Network.getStatus();
      if (!isConnected.connected) {
        this.showNoInternetAlert();
        return;
      }

      await this.userService.setQRInfo(qrInfo);
      console.log(`QR registrado: ${qrInfo}`);
    } catch (error) {
      console.error('Error al registrar el QR:', error);
    }
  }

  async showNoInternetAlert() {
    const alert = await this.alertController.create({
      header: 'Sin conexión',
      message: 'No se puede completar la acción porque no hay conexión a internet.',
      buttons: [{ text: 'Reintentar', handler: () => this.retryAction() }, { text: 'Cancelar', role: 'cancel' }],
    });
    await alert.present();
  }

  retryAction() {
    console.log('Reintentando...');
  }

  async showLoadingTimeoutAlert() {
    const alert = await this.alertController.create({
      header: 'Tiempo de espera agotado',
      message: 'El proceso está tardando más de lo esperado.',
      buttons: [{ text: 'Cancelar', role: 'cancel', handler: () => this.cancelLoading() }],
    });
    await alert.present();
  }

  cancelLoading() {
    console.log('Carga cancelada');
  }

  // Función agregada para validar si el resultado es una URL válida
  isUrl(value: string): boolean {
    try {
      const url = new URL(value); // Intenta convertir el valor a una URL
      return url.protocol === 'http:' || url.protocol === 'https:'; // Verifica si es http o https
    } catch {
      return false; // No es una URL válida
    }
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
