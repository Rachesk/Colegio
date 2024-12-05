import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

@Injectable({
  providedIn: 'root',
})
export class QrScannerService {
  private barcodeScannerSupported: boolean = false;

  constructor() {}

  async init(): Promise<void> {
    try {
      const result = await BarcodeScanner.isSupported();
      this.barcodeScannerSupported = result.supported;
    } catch (e) {
      console.error('Failed to check barcode scanner support', e);
    }
  }

  async scan(): Promise<string[]> {
    if (this.barcodeScannerSupported) {
      const { barcodes } = await BarcodeScanner.scan();
      return barcodes.map((barcode) => barcode.rawValue);
    } else {
      throw new Error('Barcode scanner not supported on this device');
    }
  }
}

