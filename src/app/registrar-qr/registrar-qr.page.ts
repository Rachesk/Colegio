import { Component } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { BarcodeScanner, BarcodeFormat } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-registrar-qr',
  templateUrl: './registrar-qr.page.html',
  styleUrls: ['./registrar-qr.page.scss'],
})
export class RegistrarQrPage {
  result: string = '';

  constructor(
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
      // Verifica e instala el módulo si es necesario
      await this.checkAndInstallGoogleBarcodeModule();

      // Verifica permisos
      await this.ensureCameraPermissions();

      // Inicia el escáner
      const { barcodes } = await BarcodeScanner.scan({
        formats: [BarcodeFormat.QrCode], // Usa BarcodeFormat correctamente
      });

      this.result = barcodes.length > 0 ? barcodes[0].rawValue : 'No se detectó ningún código QR';

      if (this.result) {
        this.showConfirmationAlert(this.result);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Ocurrió un problema desconocido.';
      console.error('Error al escanear el QR:', errorMessage);
      this.showAlert('Error', errorMessage);
    } finally {
      loading.dismiss();
    }
  }

  async checkAndInstallGoogleBarcodeModule(): Promise<void> {
    const { available } = await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
    if (!available) {
      await BarcodeScanner.installGoogleBarcodeScannerModule();
    }
  }

  async ensureCameraPermissions(): Promise<void> {
    const { camera } = await BarcodeScanner.checkPermissions();
    if (camera !== 'granted') {
      await BarcodeScanner.requestPermissions();
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
}


