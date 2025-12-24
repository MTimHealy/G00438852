import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonLabel, IonItem, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonSpinner, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { heart, settings, home, search } from 'ionicons/icons';
import { Recipe } from '../services/recipe';
import { Recipe as RecipeModel } from '../models/recipe.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonLabel, IonItem, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonSpinner, IonSelect, IonSelectOption, RouterLink, CommonModule, FormsModule],
})
export class HomePage {
  searchQuery: string = '';
  recipes: RecipeModel[] = [];
  loading: boolean = false;
  searched: boolean = false;
  resultLimit: number = 10;
  foodFact: string = '';
  loadingFact: boolean = true;

  constructor(private recipeService: Recipe) {
    addIcons({ heart, settings, home, search });
    this.loadFoodFact();
  }

  async loadFoodFact() {
    try {
      this.foodFact = await this.recipeService.getRandomFoodFact();
      this.loadingFact = false;
    } catch (error) {
      console.error('Error loading food fact:', error);
      this.foodFact = 'Did you know? Cooking is both an art and a science!';
      this.loadingFact = false;
    }
  }

  async searchRecipes() {
    if (!this.searchQuery.trim()) {
      return;
    }

    this.loading = true;
    this.searched = true;
    this.recipes = [];

    try {
      const response = await this.recipeService.searchRecipes(this.searchQuery, this.resultLimit);
      this.recipes = response.results;
      this.loading = false;
    } catch (error) {
      console.error('Error searching recipes:', error);
      this.loading = false;
    }
  }
}
