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
  conjugations: any = null; // Stores the conjugation data of the searched verb
  favorites: any[] = []; // Stores favorite verbs
  errorMessage: string = ''; // For displaying error messages, if needed
  selectedVerb: string = ''; // The verb currently displayed

  constructor(private fb: FormBuilder, private verbService: VerbService) {
    this.verbForm = this.fb.group({
      verb: ['', Validators.required]
    });
  }

  onSearchVerb() {
    const { verb } = this.verbForm.value;
    this.errorMessage = '';
    this.conjugations = null;
    this.selectedVerb = verb; // Store the searched verb

    this.verbService.getVerb(verb).subscribe({
      next: (response) => {
        console.log('API response:', response);
        if (response.verb) {
          this.conjugations = response.verb;
        } else {
          this.errorMessage = 'No conjugation data found.';
          console.warn('No verb data found in response.');
        }
      },
      error: (error) => {
        this.errorMessage = 'Error fetching verb.';
        console.error('Error fetching verb', error);
      }
    });
  }

  // Method to add the displayed verb to favorites
  addToFavorites() {
    if (!this.selectedVerb) {
      this.errorMessage = 'No verb selected to add to favorites.';
      return;
    }

    this.verbService.addFavorite(this.selectedVerb).subscribe({
      next: (response) => {
        console.log('Verb added to favorites:', response);
        this.getFavorites(); // Refresh the favorites list
      },
      error: (error) => {
        this.errorMessage = 'Error adding verb to favorites.';
        console.error('Error adding verb to favorites', error);
      }
    });
  }

  // Method to fetch favorites
  getFavorites() {
    this.verbService.getAllFavorites().subscribe({
      next: (response) => {
        console.log('Favorites retrieved:', response);
        this.favorites = response.verbs || []; // Adjust to match the response structure
      },
      error: (error) => {
        this.errorMessage = 'Error fetching favorites.';
        console.error('Error fetching favorites', error);
      }
    });
  }

  // Method to remove a favorite
  removeFavorite(id: string) {
    this.verbService.deleteFavorite(id).subscribe({
      next: () => {
        console.log('Favorite removed.');
        this.getFavorites(); // Refresh the favorites after deletion
      },
      error: (error) => {
        this.errorMessage = 'Error removing favorite.';
        console.error('Error removing favorite', error);
      }
    });
  }

  // Utility method to iterate over objects in the HTML template
  objectEntries(obj: any): [string, any][] {
    return Object.entries(obj);
  }
}
