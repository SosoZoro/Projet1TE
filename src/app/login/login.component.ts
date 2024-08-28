import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'; // Pour la redirection
import { MatSnackBar } from '@angular/material/snack-bar'; // Pour les notifications (si Angular Material est installé)

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar // Injection du service pour afficher les messages snack-bar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        response => {
          // Gère la réponse et enregistre le token si nécessaire
          this.authService.saveToken(response.token);
          
          // Affiche un message de succès
          this.snackBar.open('Connexion réussie !', 'Fermer', { duration: 2000 });

          // Redirige l'utilisateur vers la page des verbes
          this.router.navigate(['/verbs']);
        },
        error => {
          // Gère l'erreur, affiche un message à l'utilisateur
          this.snackBar.open('Erreur lors de la connexion. Veuillez vérifier vos informations.', 'Fermer', { duration: 3000 });
        }
      );
    }
  }
}
