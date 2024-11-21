import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private username: string = '';
  private qrInfo: { [key: string]: number } = {};

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  async setUser(username: string) {
    this.username = username;
    await this.storage.set('username', username);
  }

  async getUser(): Promise<string> {
    // Si `username` ya está en memoria, lo devuelve, sino lo carga desde `Storage`
    if (!this.username) {
      this.username = await this.storage.get('username') || '';
    }
    return this.username;
  }

  async clearUser() {
    this.username = '';
    await this.storage.remove('username');
  }

  async setQRInfo(qrInfo: string) {
    if (this.qrInfo[qrInfo]) {
      this.qrInfo[qrInfo] += 1;
    } else {
      this.qrInfo[qrInfo] = 1;
    }
    await this.storage.set('qrInfo', this.qrInfo);
  }

  async getQRInfo(): Promise<{ [key: string]: number }> {
    if (Object.keys(this.qrInfo).length === 0) {
      this.qrInfo = await this.storage.get('qrInfo') || {};
    }
    return this.qrInfo;
  }
}
