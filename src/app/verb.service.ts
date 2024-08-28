import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Importe AuthService pour utiliser le token

@Injectable({
  providedIn: 'root'
})
export class VerbService {
  private apiUrl = 'https://seal-app-v5cj7.ondigitalocean.app/v0/verbs';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Méthode pour récupérer un verbe spécifique
  getVerb(verb: string): Observable<any> {
    const url = `${this.apiUrl}/`;
    const headers = new HttpHeaders({
      'x-access-token': this.authService.getToken() || ''
    });
    const body = { verb };
    return this.http.post(url, body, { headers });
  }

  // Méthode pour obtenir des verbes aléatoires
  getRandomVerbs(quantity: number): Observable<any> {
    const url = `${this.apiUrl}/random`;
    const headers = new HttpHeaders({
      'x-access-token': this.authService.getToken() || ''
    });
    const body = { quantity };
    return this.http.post(url, body, { headers });
  }

  // Méthode pour ajouter un verbe aux favoris
  addFavorite(verb: string): Observable<any> {
    const url = `${this.apiUrl}/favorites`;
    const headers = new HttpHeaders({
      'x-access-token': this.authService.getToken() || ''
    });
    const body = { verb };
    return this.http.post(url, body, { headers });
  }

  // Méthode pour récupérer tous les verbes favoris
  getAllFavorites(): Observable<any> {
    const url = `${this.apiUrl}/favorites/all`;
    const headers = new HttpHeaders({
      'x-access-token': this.authService.getToken() || ''
    });
    return this.http.get(url, { headers });
  }

  // Méthode pour supprimer un verbe favori
  deleteFavorite(id: string): Observable<any> {
    const url = `${this.apiUrl}/favorites/${id}`;
    const headers = new HttpHeaders({
      'x-access-token': this.authService.getToken() || ''
    });
    return this.http.delete(url, { headers });
  }
}
