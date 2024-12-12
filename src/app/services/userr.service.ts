import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private username: string = '';
  private qrInfo: { [key: string]: { asignatura: string, seccion: string, sala: string, fecha: string, count: number } } = {};
  private userAsignaturas: string[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  async setUser(username: string) {
    this.username = username;
    await this.storage.set('username', username);
    this.loadQRInfo();
    this.loadUserAsignaturas();
  }

  async getUser(): Promise<string> {
    if (!this.username) {
      this.username = await this.storage.get('username') || '';
    }
    return this.username;
  }

  async clearUser() {
    this.username = '';
    await this.storage.remove('username');
  }

  saveQRInfo() {
    if (this.username) {
      localStorage.setItem(`qrInfo_${this.username}`, JSON.stringify(this.qrInfo));
    }
  }

  loadQRInfo() {
    if (this.username) {
      const storedQRInfo = localStorage.getItem(`qrInfo_${this.username}`);
      if (storedQRInfo) {
        this.qrInfo = JSON.parse(storedQRInfo);
      } else {
        this.qrInfo = {};
      }
    }
  }

  saveUserAsignaturas() {
    if (this.username) {
      localStorage.setItem(`asignaturas_${this.username}`, JSON.stringify(this.userAsignaturas));
    }
  }

  loadUserAsignaturas() {
    if (this.username) {
      const storedAsignaturas = localStorage.getItem(`asignaturas_${this.username}`);
      if (storedAsignaturas) {
        this.userAsignaturas = JSON.parse(storedAsignaturas);
      } else {
        this.userAsignaturas = [];
      }
    }
  }

  async setQRInfo(qrInfo: string) {
    this.loadQRInfo();
    this.loadUserAsignaturas();
    const [asignatura, seccion, sala, fecha] = qrInfo.split('|');
    const key = `${asignatura}|${seccion}|${sala}|${fecha}`;

    if (!this.userAsignaturas.includes(asignatura)) {
      throw new Error('El usuario no tiene esta asignatura registrada.');
    }

    if (this.qrInfo[key]) {
      throw new Error('Ya existe una asistencia registrada para esta asignatura en esta fecha.');
    }

    
    this.qrInfo[key] = { asignatura, seccion, sala, fecha, count: 1 };
    this.saveQRInfo();
  }

  async getQRInfo(): Promise<{ [key: string]: { asignatura: string, seccion: string, sala: string, fecha: string, count: number } }> {
    this.loadQRInfo();
    return this.qrInfo;
  }

  async addAsignatura(asignatura: string) {
    this.loadUserAsignaturas();
    if (!this.userAsignaturas.includes(asignatura)) {
      this.userAsignaturas.push(asignatura);
      this.saveUserAsignaturas();
    }
  }

  async removeAsignatura(asignatura: string) {
    this.loadUserAsignaturas();
    this.userAsignaturas = this.userAsignaturas.filter(a => a !== asignatura);
    this.saveUserAsignaturas();
  }
}
