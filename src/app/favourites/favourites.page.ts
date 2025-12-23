import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { heart, settings, home, trash } from 'ionicons/icons';
import { Favourites } from '../services/favourites';
import { Recipe } from '../models/recipe.model';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, CommonModule, FormsModule, RouterLink]
})
export class FavouritesPage implements OnInit {
  favouriteRecipes: Recipe[] = [];

  constructor(private favouritesService: Favourites) {
    addIcons({ heart, settings, home, trash });
  }

  ngOnInit() {
    this.loadFavourites();
  }

  ionViewWillEnter() {
    this.loadFavourites();
  }

  loadFavourites() {
    this.favouriteRecipes = this.favouritesService.getFavourites();
  }

  removeFavourite(recipeId: number) {
    this.favouritesService.removeFavourite(recipeId);
    this.loadFavourites();
  }

}
