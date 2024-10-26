import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  constructor(private router: Router, private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
    const storedAuth = await this.storage.get('isAuthenticated');
    this.isAuthenticated = storedAuth === 'true';
  }

  async login(username: string, password: string): Promise<boolean> {
    const users = await this.storage.get('users');
    if (!users) {
      return false;
    }

    const validUser = users.find((u: any) => u.user === username && u.password === password);
    if (validUser) {
      this.isAuthenticated = true;
      await this.storage.set('isAuthenticated', 'true');
      return true;
    } else {
      return false;
    }
  }

  async logout(): Promise<void> {
    this.isAuthenticated = false;
    await this.storage.set('isAuthenticated', 'false');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
