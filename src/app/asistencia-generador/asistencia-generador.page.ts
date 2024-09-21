import { Component} from '@angular/core';

@Component({
  selector: 'app-asistencia-generador',
  templateUrl: './asistencia-generador.page.html',
  styleUrls: ['./asistencia-generador.page.scss'],
})
export class AsistenciaGeneradorPage {

  public qrData: string = '';
  constructor() { 
    this.generateRandomQR();
  }

  generateRandomQR() {
    this.qrData = this.generateRandomString(10); 
  }
  
  generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}