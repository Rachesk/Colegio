import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-registrar-qr',
  templateUrl: './registrar-qr.page.html',
  styleUrls: ['./registrar-qr.page.scss'],
})
export class RegistrarQrPage implements OnInit {
  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
      },
    },
  ];

  constructor(
    private loadingController: LoadingController,
    private barcodeScanner: BarcodeScanner
  ) {}

  ngOnInit() {}

  async loading2() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
      spinner: 'bubbles',
      duration: 500
    });
    await loading.present();
  }

  // Nueva función para abrir la cámara y escanear un código QR
  scanQRCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Código QR escaneado:', barcodeData.text);
      // Aquí puedes manejar el resultado escaneado
    }).catch(err => {
      console.error('Error al escanear el código QR:', err);
    });
  }
}
