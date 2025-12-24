import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonSpinner } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { heart, settings, home, trash } from 'ionicons/icons';
import { Favourites } from '../services/favourites';
import { Recipe as RecipeModel } from '../models/recipe.model';
import { Recipe } from '../services/recipe';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonSpinner, CommonModule, FormsModule, RouterLink]
})
export class FavouritesPage implements OnInit {
  favouriteRecipes: RecipeModel[] = [];
  foodFact: string = '';
  loadingFact: boolean = true;

  constructor(private favouritesService: Favourites, private recipeService: Recipe) {
    addIcons({ heart, settings, home, trash });
  }

  ngOnInit() {
    this.loadFavourites();
    this.loadFoodFact();
  }

  ionViewWillEnter() {
    this.loadFavourites();
  }

  loadFavourites() {
    this.favouriteRecipes = this.favouritesService.getFavourites();
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

  removeFavourite(recipeId: number) {
    this.favouritesService.removeFavourite(recipeId);
    this.loadFavourites();
  }

}
