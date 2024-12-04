import { Component } from '@angular/core';
import { QrScannerService } from '../services/qr-scanner.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-registrar-qr',
  templateUrl: './registrar-qr.page.html',
  styleUrls: ['./registrar-qr.page.scss'],
})
export class RegistrarQrPage {
  result: string = '';

  constructor(
    private qrScannerService: QrScannerService,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

 
  async scan(): Promise<void> {
    const loading = await this.loadingController.create({
      message: 'Escaneando...',
      spinner: 'crescent',
    });
    await loading.present();
  
    try {
      const isSupported = await BarcodeScanner.isSupported();
      if (!isSupported.supported) {
        throw new Error('El escáner de códigos QR no es compatible con este dispositivo.');
      }
  
      const barcodes = await this.qrScannerService.scan();
      this.result = barcodes.length > 0 ? barcodes[0] : 'No se detectó ningún código QR';
  
      if (this.result) {
        this.showConfirmationAlert(this.result);
      }
    } catch (error) {
      console.error('Error al escanear el QR:', error);
  
      
      const errorMessage = error instanceof Error ? error.message : 'Ocurrió un problema desconocido.';
      this.showAlert('Error', errorMessage);
    } finally {
      loading.dismiss();
    }
  }
  

  
  async showConfirmationAlert(qrInfo: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar Registro',
      message: `¿Deseas registrar este QR?: <strong>${qrInfo}</strong>`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
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
    console.log(`QR registrado: ${qrInfo}`);
   
  }

  
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  
  isUrl(value: string): boolean {
    try {
      const url = new URL(value);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  }

  
  async loading2() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
      spinner: 'bubbles',
      duration: 500,
    });
    await loading.present();
  }
}

