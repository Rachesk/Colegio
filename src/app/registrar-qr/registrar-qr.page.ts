import { Component } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { UserService } from '../services/userr.service';
import jsQR from 'jsqr';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registrar-qr',
  templateUrl: './registrar-qr.page.html',
  styleUrls: ['./registrar-qr.page.scss'],
})
export class RegistrarQrPage {
  result: string = '';

  constructor(
    private userService: UserService,
    private alertController: AlertController 
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
        console.log('Imagen cargada:', img);
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        console.log('Contexto del canvas:', context);
        if (!context) {
          this.result = 'Error: No se pudo procesar la imagen.';
          return;
        }

        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        context.drawImage(img, 0, 0);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        console.log('Datos de la imagen:', imageData);
        const code = jsQR(imageData.data, canvas.width, canvas.height);
        console.log('Resultado del QR:', code);

        if (code) {
          this.result = code.data;
          this.showConfirmationAlert(this.result); 
        } else {
          this.result = 'No se detectó ningún código QR';
        }
      };
    } catch (error) {
      console.error('Error al capturar o procesar el código QR:', error);
      this.result = 'Error al escanear el código QR';
    }
  }

  isUrl(value: string): boolean {
    try {
      new URL(value);
      return true;
    } catch (_) {
      return false;
    }
  }

  //nuevo mensaje de confirmacion u.u
  async showConfirmationAlert(qrInfo: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar Registro',
      message: `¿Deseas registrar este QR?: <strong>${qrInfo}</strong>`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Registro cancelado');
          },
        },
        {
          text: 'Confirmar',
          handler: () => {
            console.log('Registro confirmado');
            this.storeQRCodeInfo(qrInfo); 
          },
        },
      ],
    });

    await alert.present();
  }

  async storeQRCodeInfo(qrInfo: string) {
    await this.userService.setQRInfo(qrInfo);
    console.log(`QR registrado: ${qrInfo}`);
  }
}
