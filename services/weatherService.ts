
import { decryptData, encryptData } from './storageService';

const CACHE_KEY = 'festplan_weather_cache';
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  timestamp: number;
}

// Map WMO codes to text
const getWeatherLabel = (code: number): string => {
  if (code === 0) return 'Clear Sky';
  if (code >= 1 && code <= 3) return 'Partly Cloudy';
  if (code >= 45 && code <= 48) return 'Foggy';
  if (code >= 51 && code <= 55) return 'Drizzle';
  if (code >= 61 && code <= 67) return 'Rain';
  if (code >= 71 && code <= 77) return 'Snow';
  if (code >= 95) return 'Thunderstorm';
  return 'Unknown';
};

export const getRealTimeWeather = async (lat: number = 19.0760, long: number = 72.8777): Promise<WeatherData> => {
  // Check Cache first
  const cachedStr = localStorage.getItem(CACHE_KEY);
  if (cachedStr) {
    try {
      const cached: WeatherData = JSON.parse(cachedStr);
      if (Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached;
      }
    } catch (e) {
      console.warn("Invalid weather cache");
    }
  }

  try {
    // Fetch from Open-Meteo (Free, No Key Required)
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`
    );
    
    if (!response.ok) throw new Error('Weather API Failed');

    const data = await response.json();
    const current = data.current;

    const weatherData: WeatherData = {
      temperature: current.temperature_2m,
      humidity: current.relative_humidity_2m,
      windSpeed: current.wind_speed_10m,
      condition: getWeatherLabel(current.weather_code),
      timestamp: Date.now()
    };

    localStorage.setItem(CACHE_KEY, JSON.stringify(weatherData));
    return weatherData;

  } catch (error) {
    console.error("Failed to fetch real weather:", error);
    // Fallback Mock Data
    return {
      temperature: 28,
      condition: 'Sunny (Offline)',
      humidity: 60,
      windSpeed: 12,
      timestamp: Date.now()
    };
  }
};
