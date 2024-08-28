import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'; // Assure-toi que les chemins sont corrects
import { SignupComponent } from './signup/signup.component';
import { VerbComponent } from './verb/verb.component'; // Par exemple, un composant pour gérer les verbes
import { AuthGuard } from './auth.guard'; // Optionnel si tu veux protéger certaines routes avec un guard

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige vers la page de connexion par défaut
  { path: 'login', component: LoginComponent }, // Route pour la connexion
  { path: 'signup', component: SignupComponent }, // Route pour l'inscription
  { path: 'verbs', component: VerbComponent, canActivate: [AuthGuard] }, // Route pour gérer les verbes, protégée par un guard
  // Ajoute d'autres routes selon les besoins
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
