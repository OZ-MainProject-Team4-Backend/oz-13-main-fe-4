import { instance } from '../../../axios/instance';

export interface CurrentWeatherData {
  id: number;
  location_name: string;
  base_time: string;
  valid_time: string;
  temperature: number;
  feels_like: number;
  humidity: number;
  rain_probability: number | null;
  rain_volume: number | null;
  wind_speed: number;
  condition: string;
  icon: string;
}

export const weatherAPI = {
  getCurrentWeather: async (lat: number, lon: number) => {
    const response = await instance.get<CurrentWeatherData>(
      `/weather/current/?lat=${lat}&lon=${lon}`
    );
    return response.data;
  },
};
