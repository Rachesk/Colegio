import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-registrar-qr',
  templateUrl: './registrar-qr.page.html',
  styleUrls: ['./registrar-qr.page.scss'],
})
export class RegistrarQrPage implements OnInit {
  scannedQRCode: string = '';  // Para almacenar el QR escaneado
  errorMessage: string = '';    // Mensaje de error
  isScanning: boolean = false;  // Para verificar si el escáner está activo

  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  // Función de loading, si la necesitas para algo más
  async loading2() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
      spinner: 'bubbles',
      duration: 500
    });
    await loading.present();
  }

  // Inicia el escaneo del código QR
  async startScanning() {
    try {
      // Cambia el estado de la interfaz para indicar que está escaneando
      this.isScanning = true;
      
      // Inicia el escaneo del código QR
      const result = await BarcodeScanner.startScan();

      // Si se escanea el código QR, muestra el contenido
      if (result.hasContent) {
        this.scannedQRCode = result.content;  // Asigna el contenido escaneado
        this.showToast('QR escaneado con éxito');
      } else {
        this.scannedQRCode = '';  // Si no se escanea nada, limpiar el resultado
        this.showToast('No se escaneó ningún código');
      }
    } catch (error) {
      console.error('Error al iniciar el escaneo:', error);
      this.showToast('Hubo un error al escanear el código');
    } finally {
      // Cambia el estado para indicar que el escaneo ha terminado
      this.isScanning = false;
    }
  }

  // Función para mostrar mensajes emergentes
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }
}
