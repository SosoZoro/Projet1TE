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
  conjugations: string[] = [];
  favorites: any[] = [];

  constructor(private fb: FormBuilder, private verbService: VerbService) {
    this.verbForm = this.fb.group({
      verb: ['', Validators.required]
    });
  }

  onSearchVerb() {
    const { verb } = this.verbForm.value;
    this.verbService.getVerb(verb).subscribe(response => {
      this.conjugations = response.conjugations; // Ajuste selon la structure de la réponse API
    }, error => {
      console.error('Erreur lors de la récupération du verbe', error);
    });
  }

  getFavorites() {
    this.verbService.getAllFavorites().subscribe(response => {
      this.favorites = response; // Ajuste selon la structure de la réponse API
    }, error => {
      console.error('Erreur lors de la récupération des favoris', error);
    });
  }

  removeFavorite(id: string) {
    this.verbService.deleteFavorite(id).subscribe(() => {
      this.getFavorites(); // Recharge les favoris après suppression
    }, error => {
      console.error('Erreur lors de la suppression du favori', error);
    });
  }
}
