import { AIRecommendation } from './components/AIRecommendation';
import { CurrentWeather } from './components/CurrentWeather';
import { HourlyWeather } from './components/HourlyWeather';
import { TodayOutfitRecommendation } from './components/TodayOutfitRecommendation';
import {
  ComponentsGrid,
  FullWidthCard,
  MainContainer,
  PlaceholderCard,
  RecommendCard,
} from './styles/MainPageContentStyles';

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
}
export const Mainpage = () => {
  return (
    <MainContainer>
      <ComponentsGrid>
        {/* 현재 날씨 */}
        <CurrentWeather />

        <TodayOutfitRecommendation temperature={18} />

        <HourlyWeather />

        <AIRecommendation temperature={15} condition={'clear'} location={'seoul'} />

        <RecommendCard>즐겨 찾는 지역</RecommendCard>

        <RecommendCard>즐겨 찾는 지역 의상 추천</RecommendCard>
      </ComponentsGrid>
    </MainContainer>
  );
};
