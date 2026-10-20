import { WeatherSummary } from '../types';
import { DEMO_WEATHER } from '../data/demoData';

export const weatherService = {
  getCurrentWeather: async (): Promise<WeatherSummary> => {
    // Simulated short async delay to mirror network response
    await new Promise(res => setTimeout(res, 120));
    return DEMO_WEATHER;
  },

  getForecast: async () => {
    return DEMO_WEATHER.forecast;
  }
};
