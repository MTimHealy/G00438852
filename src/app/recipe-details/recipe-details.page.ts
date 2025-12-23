import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonSpinner } from '@ionic/angular/standalone';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { addIcons } from 'ionicons';
import { heart, settings, home } from 'ionicons/icons';
import { Recipe } from '../services/recipe';
import { Settings, MeasurementSystem } from '../services/settings';
import { Favourites } from '../services/favourites';
import { RecipeDetails, ExtendedIngredient, InstructionStep } from '../models/recipe.model';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonSpinner, CommonModule, FormsModule, RouterLink]
})
export class RecipeDetailsPage implements OnInit {
  recipeDetails: RecipeDetails | null = null;
  measurementSystem: MeasurementSystem = 'us';
  loading: boolean = true;
  error: string | null = null;
  isFavourite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private recipeService: Recipe,
    private settingsService: Settings,
    private favouritesService: Favourites
  ) {
    addIcons({ heart, settings, home });
  }

  async ngOnInit() {
    const recipeId = this.route.snapshot.paramMap.get('id');

    if (!recipeId) {
      this.error = 'No recipe ID provided';
      this.loading = false;
      return;
    }

    try {
      this.measurementSystem = this.settingsService.getMeasurementSystem();
      this.recipeDetails = await this.recipeService.getRecipeDetails(Number(recipeId));
      this.isFavourite = this.favouritesService.isFavourite(Number(recipeId));
    } catch (err) {
      this.error = 'Failed to load recipe details';
      console.error('Error loading recipe details:', err);
    } finally {
      this.loading = false;
    }
  }

  getIngredientAmount(ingredient: ExtendedIngredient): string {
    const measure = this.measurementSystem === 'us' ? ingredient.measures.us : ingredient.measures.metric;
    return `${measure.amount} ${measure.unitLong}`;
  }

  getSteps(): InstructionStep[] {
    if (!this.recipeDetails?.analyzedInstructions?.length) {
      return [];
    }
    return this.recipeDetails.analyzedInstructions[0].steps;
  }

  getIngredientImageUrl(ingredient: ExtendedIngredient): string {
    return `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`;
  }

  toggleFavourite() {
    if (!this.recipeDetails) return;

    const basicRecipe = {
      id: this.recipeDetails.id,
      title: this.recipeDetails.title,
      image: this.recipeDetails.image
    };

    if (this.isFavourite) {
      this.favouritesService.removeFavourite(this.recipeDetails.id);
      this.isFavourite = false;
    } else {
      this.favouritesService.addFavourite(basicRecipe);
      this.isFavourite = true;
    }
  }

}
