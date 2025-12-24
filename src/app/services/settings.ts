import { Injectable } from '@angular/core';

export type MeasurementSystem = 'us' | 'metric';
export type ThemeMode = 'dark' | 'light';

@Injectable({
  providedIn: 'root',
})
export class Settings {
  private readonly MEASUREMENT_KEY = 'measurementSystem';
  private readonly THEME_KEY = 'themeMode';

  getMeasurementSystem(): MeasurementSystem {
    const value = localStorage.getItem(this.MEASUREMENT_KEY);
    return (value as MeasurementSystem) || 'metric';
  }

  setMeasurementSystem(system: MeasurementSystem): void {
    localStorage.setItem(this.MEASUREMENT_KEY, system);
  }

  getThemeMode(): ThemeMode {
    const value = localStorage.getItem(this.THEME_KEY);
    return (value as ThemeMode) || 'dark';
  }

  setThemeMode(mode: ThemeMode): void {
    localStorage.setItem(this.THEME_KEY, mode);
    this.applyTheme(mode);
  }

  applyTheme(mode: ThemeMode): void {
    const body = document.body;
    if (mode === 'light') {
      body.classList.add('light-theme');
    } else {
      body.classList.remove('light-theme');
    }
  }

  initializeTheme(): void {
    const theme = this.getThemeMode();
    this.applyTheme(theme);
  }
}
