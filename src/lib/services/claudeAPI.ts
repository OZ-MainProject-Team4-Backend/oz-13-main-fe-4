import { getActivityRecommendation } from '../../utils/activityRecommendation';
import { USE_MOCK } from './apiConfig';

interface WeatherContext {
  temperature: number;
  condition: string;
  location: string;
  humidity?: number;
  windSpeed?: number;
}

export const getAIRecommendation = async (weather: WeatherContext): Promise<string> => {
  if (USE_MOCK) {
    // dev환경에서만 이렇게 사용
    // delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return getActivityRecommendation(weather);
  }

  // prod환경에선 vercel 플러그인으로 CORS 처리 할 예정
  try {
    const params = new URLSearchParams({
      temperature: weather.temperature.toString(),
      condition: weather.condition,
      location: weather.location,
    });

    if (weather.humidity) {
      params.append('humidity', weather.humidity.toString());
    }
    if (weather.windSpeed) {
      params.append('windSpeed', weather.windSpeed.toString());
    }

    const response = await fetch(`/api/claude-recommendation?${params.toString()}`);

    if (!response.ok) {
      throw new Error(`API 호출 실패: ${response.status}`);
    }

    const data = await response.json();
    return data.recommendation;
  } catch (error) {
    console.error('Vercel Function 호출 실패:', error);

    // 폴백: 룰 기반으로 안전장치
    console.log('🔄 룰 기반으로 폴백...');
    return getActivityRecommendation(weather);
  }
};
