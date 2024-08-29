import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class VerbService {
  private apiUrl = 'https://seal-app-v5cj7.ondigitalocean.app/v0/verbs';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Méthode pour récupérer un verbe spécifique
  getVerb(verb: string): Observable<any> {
    const url = `${this.apiUrl}/`;
    const token = this.authService.getToken();
    console.log('Token used in request:', token);

    if (!token) {
      console.error('No token available for request.');
      return throwError('Token is missing');
    }

    const headers = new HttpHeaders({
      'x-access-token': token
    });

    return this.http.post(url, { verb }, { headers }).pipe(
      tap({
        next: (response) => console.log('Get Verb API Response:', response),
        error: (error) => console.error('Error fetching verb:', error)
      })
    );
  }

  // Méthode pour ajouter un verbe aux favoris
  addFavorite(verb: string): Observable<any> {
    const url = `${this.apiUrl}/favorites`;
    const token = this.authService.getToken();
    console.log('Token used in request for adding favorite:', token);

    if (!token) {
      console.error('No token available for request.');
      return throwError('Token is missing');
    }

    const headers = new HttpHeaders({
      'x-access-token': token
    });

    const body = { verb };
    return this.http.post(url, body, { headers }).pipe(
      tap({
        next: (response) => console.log('Add Favorite API Response:', response),
        error: (error) => console.error('Error adding favorite:', error)
      })
    );
  }

  // Méthode pour récupérer tous les verbes favoris
  getAllFavorites(): Observable<any> {
    const url = `${this.apiUrl}/favorites/all`;
    const token = this.authService.getToken();
    console.log('Token used in request for getting all favorites:', token);

    if (!token) {
      console.error('No token available for request.');
      return throwError('Token is missing');
    }

    const headers = new HttpHeaders({
      'x-access-token': token
    });

    return this.http.get(url, { headers }).pipe(
      tap({
        next: (response) => console.log('Get All Favorites API Response:', response),
        error: (error) => console.error('Error fetching all favorites:', error)
      })
    );
  }

  // Méthode pour supprimer un verbe favori
  deleteFavorite(id: string): Observable<any> {
    const url = `${this.apiUrl}/favorites/${id}`;
    const token = this.authService.getToken();
    console.log('Token used in request for deleting favorite:', token);

    if (!token) {
      console.error('No token available for request.');
      return throwError('Token is missing');
    }

    const headers = new HttpHeaders({
      'x-access-token': token
    });

    return this.http.delete(url, { headers }).pipe(
      tap({
        next: () => console.log('Favorite deleted successfully'),
        error: (error) => console.error('Error deleting favorite:', error)
      })
    );
  }
}
