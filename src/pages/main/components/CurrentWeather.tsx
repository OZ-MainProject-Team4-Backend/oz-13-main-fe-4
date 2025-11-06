import { Box } from '@mui/material';
import {
  CurrentWeatherCardHeader,
  InfoBox,
  InfoGroup,
  InfoLabel,
  InfoValue,
  LocationText,
  Temperature,
  TemperatureSection,
  WeatherCard,
  WeatherCondition,
  WeatherIcon,
} from '../styles/MainPageContentStyles';

interface CurrentWeatherProps {
  location: string;
  temperature: number;
  condition: string;
  precipitation: number; // 강수확률
  feelsLike: number; // 체감온도
  onEditLocation?: () => void;
}

export const CurrentWeather = () => {
  return (
    <WeatherCard>
      <CurrentWeatherCardHeader>
        <LocationText>location</LocationText>
      </CurrentWeatherCardHeader>
      <TemperatureSection>
        <WeatherIcon>🌍</WeatherIcon>
        <Box>
          <Temperature>18 °C</Temperature>
          <WeatherCondition>맑음</WeatherCondition>
        </Box>
      </TemperatureSection>
      <InfoGroup>
        <InfoBox>
          <InfoLabel>기온</InfoLabel>
          <InfoValue>18 °C</InfoValue>
        </InfoBox>
        <InfoBox>
          <InfoLabel>강수확률</InfoLabel>
          <InfoValue>5%</InfoValue>
        </InfoBox>
        <InfoBox>
          <InfoLabel>체감온도</InfoLabel>
          <InfoValue>16 °C</InfoValue>
        </InfoBox>
      </InfoGroup>
    </WeatherCard>
  );
};
