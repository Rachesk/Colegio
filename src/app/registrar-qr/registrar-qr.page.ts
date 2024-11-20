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
      // Captura de la imagen con la cámara
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
      });

      // Creación de la imagen a partir de la fuente de datos capturada
      const img = new Image();
      img.src = image.dataUrl!;
      img.onload = () => {
        // Crear un canvas para dibujar la imagen
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) {
          this.result = 'Error: No se pudo procesar la imagen.';
          return;
        }

        // Configuración del tamaño del canvas según la imagen
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        context.drawImage(img, 0, 0);

        // Obtener los datos de imagen del canvas para detectar el QR
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, canvas.width, canvas.height);

        // Verificar si el código QR fue detectado
        if (code) {
          this.result = `QR detectado: ${code.data}`; // Mostrar el contenido del QR
        } else {
          this.result = 'No se detectó ningún código QR';
        }
      };
    } catch (error) {
      console.error('Error al capturar o procesar el código QR:', error);
      this.result = 'Error al escanear el código QR';
    }
  }
}

