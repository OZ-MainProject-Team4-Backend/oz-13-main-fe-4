import { CurrentWeather } from './components/CurrentWeather';
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

        <PlaceholderCard>오늘의 3벌 추천 코디</PlaceholderCard>

        <FullWidthCard>시간대별 날씨</FullWidthCard>

        <FullWidthCard>AI 추천 문구</FullWidthCard>

        <RecommendCard>즐겨 찾는 지역</RecommendCard>

        <RecommendCard>즐겨 찾는 지역 의상 추천</RecommendCard>
      </ComponentsGrid>
    </MainContainer>
  );
};
