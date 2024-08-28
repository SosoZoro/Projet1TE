import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://seal-app-v5cj7.ondigitalocean.app/v0/users';

  constructor(private http: HttpClient) {}

  // Méthode pour l'inscription
  signUp(email: string, name: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/signup`;
    const body = { email, name, password };
    return this.http.post(url, body);
  }

  // Méthode pour la connexion
  login(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/login`;
    const body = { email, password };
    return this.http.post(url, body);
  }

  // Vérifie si localStorage est disponible
  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  // Méthode pour stocker le token (dans le stockage local ou session)
  saveToken(token: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('authToken', token);
    } else {
      console.warn('localStorage is not available; token was not saved.');
    }
  }

  // Méthode pour récupérer le token
  getToken(): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem('authToken');
    }
    console.warn('localStorage is not available; no token retrieved.');
    return null;
  }

  // Méthode pour supprimer le token lors de la déconnexion
  logout(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('authToken');
    }
  }
}
