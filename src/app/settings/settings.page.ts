import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonLabel, IonList, IonItem, IonRadioGroup, IonRadio } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { heart, settings, home } from 'ionicons/icons';
import { Settings, MeasurementSystem } from '../services/settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonLabel, IonList, IonItem, IonRadioGroup, IonRadio, CommonModule, FormsModule, RouterLink]
})
export class SettingsPage implements OnInit {
  selectedUnit: MeasurementSystem = 'metric';

  constructor(private settingsService: Settings) {
    addIcons({ heart, settings, home });
  }

  ngOnInit() {
    this.selectedUnit = this.settingsService.getMeasurementSystem();
  }

  onUnitChange(event: any) {
    this.selectedUnit = event.detail.value;
    this.settingsService.setMeasurementSystem(this.selectedUnit);
  }

}
