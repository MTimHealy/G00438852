import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonLabel, IonItem, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonSpinner, IonInfiniteScroll, IonInfiniteScrollContent, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { heart, settings, home, search, arrowUp } from 'ionicons/icons';
import { Recipe } from '../services/recipe';
import { Recipe as RecipeModel } from '../models/recipe.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonLabel, IonItem, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonSpinner, IonInfiniteScroll, IonInfiniteScrollContent, IonFab, IonFabButton, RouterLink, CommonModule, FormsModule],
})
export class HomePage {
  searchQuery: string = '';
  recipes: RecipeModel[] = [];
  loading: boolean = false;
  searched: boolean = false;
  currentOffset: number = 0;
  hasMoreResults: boolean = true;
  resultsPerPage: number = 10;
  foodFact: string = '';
  loadingFact: boolean = true;
  showBackToTop: boolean = false;

  constructor(private recipeService: Recipe) {
    addIcons({ heart, settings, home, search, arrowUp });
    this.loadFoodFact();
  }

  onScroll(event: any) {
    const scrollTop = event.detail.scrollTop;
    this.showBackToTop = scrollTop > 300;
  }

  scrollToTop(content: IonContent) {
    content.scrollToTop(500);
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
    this.currentOffset = 0;
    this.hasMoreResults = true;

    try {
      const response = await this.recipeService.searchRecipes(this.searchQuery, this.resultsPerPage, 0);
      this.recipes = response.results;
      this.currentOffset = this.resultsPerPage;

      if (response.results.length < this.resultsPerPage) {
        this.hasMoreResults = false;
      }

      this.loading = false;
    } catch (error) {
      console.error('Error searching recipes:', error);
      this.loading = false;
    }
  }

  async loadMoreResults(event: any) {
    if (!this.searchQuery.trim() || !this.hasMoreResults) {
      event.target.complete();
      return;
    }

    try {
      const response = await this.recipeService.searchRecipes(
        this.searchQuery,
        this.resultsPerPage,
        this.currentOffset
      );

      this.recipes = [...this.recipes, ...response.results];
      this.currentOffset += this.resultsPerPage;

      if (response.results.length < this.resultsPerPage) {
        this.hasMoreResults = false;
      }

      event.target.complete();
    } catch (error) {
      console.error('Error loading more recipes:', error);
      event.target.complete();
    }
  }
}
