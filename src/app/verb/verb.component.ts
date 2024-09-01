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
  conjugations: any = null; // Stocke les données de conjugaison du verbe recherché
  favorites: any[] = []; // Stocke les verbes favoris
  errorMessage: string = ''; // Pour afficher les messages d'erreur
  selectedVerb: string = ''; // Le verbe actuellement affiché
  selectedTense: string = ''; // Le temps verbal sélectionné
  tenses: string[] = []; // Liste des temps verbaux disponibles

  constructor(private fb: FormBuilder, private verbService: VerbService) {
    this.verbForm = this.fb.group({
      verb: ['', Validators.required]
    });
  }

  onSearchVerb() {
    const { verb } = this.verbForm.value;
    this.errorMessage = '';
    this.conjugations = null;
    this.selectedVerb = verb; // Stocke le verbe recherché

    this.verbService.getVerb(verb).subscribe({
      next: (response) => {
        console.log('API response:', response);
        if (response.verb) {
          this.conjugations = response.verb;
          // Filtrer et récupérer seulement les temps verbaux pertinents
          this.tenses = Object.keys(this.conjugations).filter(key =>
            this.isValidTenseKey(key)
          );
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

  // Méthode pour vérifier si une clé correspond à un temps verbal valide
  isValidTenseKey(key: string): boolean {
    const validTenseKeys = ['indicatif', 'subjonctif', 'conditionnel', 'imperatif', 'participe', 'infinitive'];
    return validTenseKeys.some(tense => key.includes(tense));
  }

  // Méthode utilitaire pour vérifier si une entrée est un objet
  isObject(value: any): boolean {
    return typeof value === 'object' && value !== null;
  }

  // Méthode pour ajouter le verbe affiché aux favoris
  addToFavorites() {
    if (!this.selectedVerb) {
      this.errorMessage = 'Aucun verbe sélectionné à ajouter aux favoris.';
      return;
    }

    this.verbService.addFavorite(this.selectedVerb).subscribe({
      next: (response) => {
        console.log('Verbe ajouté aux favoris:', response);
        this.getFavorites(); // Rafraîchit la liste des favoris
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de l\'ajout du verbe aux favoris.';
        console.error('Erreur lors de l\'ajout du verbe aux favoris', error);
      }
    });
  }

  // Méthode pour récupérer les favoris
  getFavorites() {
    this.verbService.getAllFavorites().subscribe({
      next: (response) => {
        console.log('Favoris récupérés:', response);
        this.favorites = response.verbs || []; // Ajuste pour correspondre à la structure de réponse
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
        this.getFavorites(); // Rafraîchit les favoris après suppression
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
