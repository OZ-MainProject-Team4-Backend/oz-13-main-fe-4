import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';
import {
  HourLabel,
  HourlyWeatherCard,
  HourlyItem,
  HourlyContainer,
  TemperatureLabel,
  WeatherIconBox,
} from '../styles/MainPageContentStyles';

interface HourlyWeatherData {
  time: string;
  temperature: number;
  icon: string;
  condition?: string;
}

interface HourlyWeatherProps {
  hourlyData?: HourlyWeatherData[];
}

export const HourlyWeather = ({ hourlyData = [] }: HourlyWeatherProps) => {
  const displayData =
    hourlyData.length > 0
      ? hourlyData
      : Array(8)
          .fill(null)
          .map((_, index) => ({
            time: `${index * 3}시`,
            temperature: 18,
            icon: '000',
          }));

  return (
    <HourlyWeatherCard>
      <HourlyContainer>
        {displayData.map((data, index) => (
          <HourlyItem key={index}>
            <HourLabel>{data.time}</HourLabel>
            <WeatherIconBox>
              <CloudOutlinedIcon sx={{ fontSize: 48, color: '#5B9EFF' }} />
            </WeatherIconBox>
            <TemperatureLabel>{data.temperature} °C</TemperatureLabel>
          </HourlyItem>
        ))}
      </HourlyContainer>
    </HourlyWeatherCard>
  );
};
