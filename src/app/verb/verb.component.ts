import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerbService } from '../verb.service';

@Component({
  selector: 'app-verb',
  templateUrl: './verb.component.html',
  styleUrls: ['./verb.component.scss']
})
export class VerbComponent {
  verbForm: FormGroup;
  conjugations: any = null; // Contient les données de conjugaison du verbe recherché
  favorites: any[] = []; // Contient les favoris
  errorMessage: string = ''; // Pour afficher un message d'erreur si nécessaire

  constructor(private fb: FormBuilder, private verbService: VerbService) {
    this.verbForm = this.fb.group({
      verb: ['', Validators.required]
    });
  }

  onSearchVerb() {
    const { verb } = this.verbForm.value;
    this.errorMessage = '';
    this.conjugations = null;

    this.verbService.getVerb(verb).subscribe({
      next: (response) => {
        console.log('API response:', response);
        if (response.verb) {
          this.conjugations = response.verb;
        } else {
          this.errorMessage = 'Aucune donnée de conjugaison trouvée.';
          console.warn('No verb data found in response.');
        }
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la récupération du verbe.';
        console.error('Erreur lors de la récupération du verbe', error);
      }
    });
  }

  // Méthode pour récupérer les favoris
  getFavorites() {
    this.verbService.getAllFavorites().subscribe({
      next: (response) => {
        console.log('Favoris récupérés:', response);
        // Assuming the response structure based on your console log
        this.favorites = response.verbs || []; // Assign the correct array from the response
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la récupération des favoris.';
        console.error('Erreur lors de la récupération des favoris', error);
      }
    });
  }

  // Méthode pour supprimer un favori
  removeFavorite(id: string) {
    this.verbService.deleteFavorite(id).subscribe({
      next: () => {
        console.log('Favori supprimé.');
        this.getFavorites(); // Recharge les favoris après suppression
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la suppression du favori.';
        console.error('Erreur lors de la suppression du favori', error);
      }
    });
  }

  // Méthode utilitaire pour itérer sur les objets dans le template HTML
  objectEntries(obj: any): [string, any][] {
    return Object.entries(obj);
  }
}
