import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private username: string = '';

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
}
