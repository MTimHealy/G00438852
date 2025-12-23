import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { RecipeSearchResponse } from '../models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class Recipe {
  private apiKey = '70759a4f7911402abcc53d3c51d3b759';
  private baseUrl = 'https://api.spoonacular.com/recipes';

  async searchRecipes(query: string, number: number = 10): Promise<RecipeSearchResponse> {
    const url = `${this.baseUrl}/complexSearch?query=${encodeURIComponent(query)}&number=${number}&apiKey=${this.apiKey}`;

    const response: HttpResponse = await CapacitorHttp.get({ url });
    return response.data as RecipeSearchResponse;
  }
}
