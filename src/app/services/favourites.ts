import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class Favourites {
  private readonly FAVOURITES_KEY = 'favourites';

  getFavourites(): Recipe[] {
    const value = localStorage.getItem(this.FAVOURITES_KEY);
    return value ? JSON.parse(value) : [];
  }

  addFavourite(recipe: Recipe): void {
    const favourites = this.getFavourites();

    const exists = favourites.some(fav => fav.id === recipe.id);
    if (!exists) {
      favourites.push(recipe);
      localStorage.setItem(this.FAVOURITES_KEY, JSON.stringify(favourites));
    }
  }

  removeFavourite(recipeId: number): void {
    const favourites = this.getFavourites();
    const filtered = favourites.filter(fav => fav.id !== recipeId);
    localStorage.setItem(this.FAVOURITES_KEY, JSON.stringify(filtered));
  }

  isFavourite(recipeId: number): boolean {
    const favourites = this.getFavourites();
    return favourites.some(fav => fav.id === recipeId);
  }
}
