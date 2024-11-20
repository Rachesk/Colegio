import { Component } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import jsQR from 'jsqr';

@Component({
  selector: 'app-registrar-qr',
  templateUrl: './registrar-qr.page.html',
  styleUrls: ['./registrar-qr.page.scss'],
})
export class RegistrarQrPage {
  result: string = '';

  constructor() {}

  async scan(): Promise<void> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
      });

      const img = new Image();
      img.src = image.dataUrl!;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) {
          this.result = 'Error: No se pudo procesar la imagen.';
          return;
        }

        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        context.drawImage(img, 0, 0);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, canvas.width, canvas.height);

        if (code) {
          this.result = code.data;
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
}
