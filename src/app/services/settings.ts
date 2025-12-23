import { Injectable } from '@angular/core';

export type MeasurementSystem = 'us' | 'metric';

@Injectable({
  providedIn: 'root',
})
export class Settings {
  private readonly MEASUREMENT_KEY = 'measurementSystem';

  getMeasurementSystem(): MeasurementSystem {
    const value = localStorage.getItem(this.MEASUREMENT_KEY);
    return (value as MeasurementSystem) || 'us';
  }

  setMeasurementSystem(system: MeasurementSystem): void {
    localStorage.setItem(this.MEASUREMENT_KEY, system);
  }
}
