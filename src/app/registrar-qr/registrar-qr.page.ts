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

        if (!context) {
          console.error('Error: No se pudo obtener el contexto del canvas.');
          this.result = 'Error: No se pudo procesar la imagen.';
          return;
        }

        // Configuración del canvas
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        context.drawImage(img, 0, 0);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        console.log('Datos de la imagen:', imageData);

        const code = jsQR(imageData.data, canvas.width, canvas.height);

        if (code) {
          this.result = code.data;
          console.log('QR Detectado:', this.result);
          this.showConfirmationAlert(this.result);
        } else {
          console.warn('No se detectó ningún código QR.');
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

  // Mensaje de confirmación con manejo de errores adicional
  async showConfirmationAlert(qrInfo: string) {
    try {
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
              this.storeQRCodeInfo(qrInfo); // Registrar el QR después de la confirmación
            },
          },
        ],
      });

      await alert.present();
    } catch (error) {
      console.error('Error al mostrar el mensaje de confirmación:', error);
    }
  }

  // Almacena la información del QR en el servicio de usuario
  async storeQRCodeInfo(qrInfo: string) {
    try {
      await this.userService.setQRInfo(qrInfo);
      console.log(`QR registrado exitosamente: ${qrInfo}`);
    } catch (error) {
      console.error('Error al registrar el QR:', error);
    }
  }
}
            