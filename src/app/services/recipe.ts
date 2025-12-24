import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { RecipeSearchResponse, RecipeDetails } from '../models/recipe.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Recipe {
  private apiKey = environment.spoonacularApiKey;
  private baseUrl = 'https://api.spoonacular.com/recipes';

  async searchRecipes(query: string, number: number = 10): Promise<RecipeSearchResponse> {
    const url = `${this.baseUrl}/complexSearch?query=${encodeURIComponent(query)}&number=${number}&apiKey=${this.apiKey}`;

    const response: HttpResponse = await CapacitorHttp.get({ url });
    return response.data as RecipeSearchResponse;
  }

  async getRecipeDetails(id: number): Promise<RecipeDetails> {
    const url = `${this.baseUrl}/${id}/information?apiKey=${this.apiKey}`;

    const response: HttpResponse = await CapacitorHttp.get({ url });
    return response.data as RecipeDetails;
  }

  async getRandomFoodFact(): Promise<string> {
    const url = `https://api.spoonacular.com/food/trivia/random?apiKey=${this.apiKey}`;

    const response: HttpResponse = await CapacitorHttp.get({ url });
    return response.data.text;
  }
}
