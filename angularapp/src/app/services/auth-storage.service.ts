import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthStorageService {

  private memoryStorage: any = {};

  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
    // return false;
  }
  setItem(key: string, value: string) {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(key, value);
    } else {
      this.memoryStorage[key] = value;
    }
    console.log(this.isLocalStorageAvailable());
  }

  getItem(key: string): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem(key);
    } else {
      return this.memoryStorage[key] || null;
    }
  }

  removeItem(key: string) {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(key);
    }
    delete this.memoryStorage[key];
  }

  clear() {
    if (this.isLocalStorageAvailable()) {
      localStorage.clear();
    }
    this.memoryStorage = {};
  }

}



