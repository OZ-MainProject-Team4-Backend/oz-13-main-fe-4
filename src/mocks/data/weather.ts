export const mockCurrentWeather = {
  city: '서울',
  temperature: 18,
  feels_like: 16,
  humidity: 60,
  wind_speed: 3.0,
  rain_probability: 30,
  rain_volume: 1.2,
  condition: 'scattered clouds', // description 값
  icon: '03d',
};

export const mockForecastData = {
  current_weather: {
    temperature: 18,
    icon: '03d',
    condition: 'scattered clouds', // description 값
    rain_probability: 10,
    feels_like: 20,
  },
  weathers: [
    {
      time: '07:00',
      temperature: 18,
      icon: '01d',
      condition: 'clear sky', // description 값
      rain_probability: 10,
      feels_like: 20,
    },
    {
      time: '10:00',
      temperature: 20,
      icon: '02d',
      condition: 'few clouds', // description 값
      rain_probability: 5,
      feels_like: 22,
    },
    {
      time: '13:00',
      temperature: 22,
      icon: '01d',
      condition: 'clear sky', // description 값
      rain_probability: 0,
      feels_like: 24,
    },
    {
      time: '16:00',
      temperature: 21,
      icon: '03d',
      condition: 'scattered clouds', // description 값
      rain_probability: 15,
      feels_like: 23,
    },
    {
      time: '19:00',
      temperature: 19,
      icon: '04d',
      condition: 'broken clouds', // description 값
      rain_probability: 20,
      feels_like: 21,
    },
    {
      time: '22:00',
      temperature: 17,
      icon: '10n',
      condition: 'light rain', // description 값
      rain_probability: 25,
      feels_like: 19,
    },
  ],
};
