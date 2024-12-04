import { Component } from '@angular/core';
import { QrScannerService } from '../services/qr-scanner.service';
import { AlertController, LoadingController } from '@ionic/angular';

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
      const barcodes = await this.qrScannerService.scan();
      this.result = barcodes.length > 0 ? barcodes[0] : 'No se detectó ningún código QR';

      if (this.result) {
        this.showConfirmationAlert(this.result);
      }
    } catch (error) {
      console.error('Error al escanear el QR:', error);
      this.showAlert('Error', 'Ocurrió un problema al escanear el QR.');
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

  
  async storeQRCodeInfo(qrInfo: string) { // en teoria deberiamos guardar aca
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

  // Método para verificar si el resultado del QR es una URL válida
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
