import { Component } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { UserService } from '../services/userr.service';
import { BarcodeScanner, BarcodeFormat } from '@capacitor-mlkit/barcode-scanning';

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
    const loading = await this.loadingController.create({
      message: 'Escaneando...',
      spinner: 'crescent',
    });
    await loading.present();

    try {
      await this.checkAndInstallGoogleBarcodeModule();
      await this.ensureCameraPermissions();

      const { barcodes } = await BarcodeScanner.scan({
        formats: [BarcodeFormat.QrCode],
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
    await this.userService.setQRInfo(qrInfo);
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


