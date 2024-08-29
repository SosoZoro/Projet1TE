import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://seal-app-v5cj7.ondigitalocean.app/v0/users';
  private token: string | null = null; // Variable pour stocker le token en mémoire

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
    return this.http.post(url, body).pipe(
      tap((response: any) => {
        if (response.token) {
          this.token = response.token; // Stocke le token en mémoire
          console.log('Utilisateur connecté avec succès. Token stocké en mémoire.');
        } else {
          console.warn('Échec de la connexion : Token non trouvé.');
        }
      })
    );
  }

  // Méthode pour récupérer le token
  getToken(): string | null {
    if (this.token) {
      console.log('Retrieved token from memory:', this.token);
    }
    return this.token;
  }

  // Méthode pour supprimer le token lors de la déconnexion
  logout(): void {
    this.token = null; // Supprime le token de la mémoire
    console.log('Utilisateur déconnecté. Token supprimé de la mémoire.');
  }

  // Vérifie si l'utilisateur est connecté
  isLoggedIn(): boolean {
    if (!this.token) {
      return false;
    }

    // Vérification de l'expiration du token
    const payload = this.token.split('.')[1];
    if (!payload) {
      return false;
    }

    try {
      const decoded = JSON.parse(atob(payload));
      const isExpired = decoded.exp < Date.now() / 1000; // Vérifie si le token est expiré
      return !isExpired;
    } catch (error) {
      console.error('Erreur lors du décodage du token:', error);
      return false;
    }
  }
}
