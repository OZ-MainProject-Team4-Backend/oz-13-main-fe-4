import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';
import {
  HourLabel,
  HourlyItem,
  HourlyWeatherCard,
  TemperatureLabel,
  WeatherIconBox,
  HourlyScrollContainer,
} from '../styles/MainPageContentStyles';
import { useDragScroll } from '../../../hooks/useDragScroll';

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
  const { scrollRef, handlers } = useDragScroll({
    direction: 'horizontal',
    sensitivity: 2,
    wheelSensitivity: 1,
  });

  const getCurrentHourlyData = () => {
    const now = new Date();
    const currentHour = now.getHours();

    return Array(20)
      .fill(null)
      .map((_, index) => {
        const hour = (currentHour + index) % 24;
        return {
          time: `${hour}시`,
          temperature: 18,
          icon: '000',
        };
      });
  };

  const displayData = hourlyData.length > 0 ? hourlyData : getCurrentHourlyData();

  return (
    <HourlyWeatherCard>
      <HourlyScrollContainer ref={scrollRef} {...handlers}>
        {displayData.map((data, index) => (
          <HourlyItem key={index}>
            <HourLabel>{data.time}</HourLabel>
            <WeatherIconBox>
              <CloudOutlinedIcon sx={{ fontSize: 32, color: '#5B9EFF' }} />
            </WeatherIconBox>
            <TemperatureLabel>{data.temperature} °C</TemperatureLabel>
          </HourlyItem>
        ))}
      </HourlyScrollContainer>
    </HourlyWeatherCard>
  );
};
