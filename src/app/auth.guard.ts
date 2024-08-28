import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Vérifie que le chemin est correct

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Vérifie si l'utilisateur a un token, donc est authentifié
    if (this.authService.getToken()) {
      return true;
    } else {
      // Redirige vers la page de connexion si non authentifié
      this.router.navigate(['/login']);
      return false;
    }
  }
}
