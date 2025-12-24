import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonLabel, IonList, IonItem, IonRadioGroup, IonRadio, IonToggle } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { heart, settings, home, moon, sunny } from 'ionicons/icons';
import { Settings, MeasurementSystem } from '../services/settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonLabel, IonList, IonItem, IonRadioGroup, IonRadio, IonToggle, CommonModule, FormsModule, RouterLink]
})
export class SettingsPage implements OnInit {
  selectedUnit: MeasurementSystem = 'metric';
  isLightMode: boolean = false;

  constructor(private settingsService: Settings) {
    addIcons({ heart, settings, home, moon, sunny });
  }

  ngOnInit() {
    this.selectedUnit = this.settingsService.getMeasurementSystem();
    this.isLightMode = this.settingsService.getThemeMode() === 'light';
  }

  onUnitChange(event: any) {
    this.selectedUnit = event.detail.value;
    this.settingsService.setMeasurementSystem(this.selectedUnit);
  }

  onThemeChange(event: any) {
    const mode = this.isLightMode ? 'light' : 'dark';
    this.settingsService.setThemeMode(mode);
  }

}
