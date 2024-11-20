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
        resultType: CameraResultType.DataUrl 
      });

      const img = new Image();
      img.src = image.dataUrl!;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) {
          this.result = 'Error: Unable to process the image.';
          return;
        }

        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);

        
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, canvas.width, canvas.height);

        if (code) {
          this.result = code.data; 
        } else {
          this.result = 'No QR code detected';
        }
      };
    } catch (error) {
      console.error('Error capturing or processing QR code:', error);
      this.result = 'Error scanning QR code';
    }
  }
}
