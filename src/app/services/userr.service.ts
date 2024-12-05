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
    this.loadQRInfo();
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

  async setQRInfo(qrInfo: string) {
    this.loadQRInfo();
    if (this.qrInfo[qrInfo]) {
      this.qrInfo[qrInfo] += 1;
    } else {
      this.qrInfo[qrInfo] = 1;
    }
    this.saveQRInfo();
  }

  async getQRInfo(): Promise<{ [key: string]: number }> {
    this.loadQRInfo();
    return this.qrInfo;
  }
}
