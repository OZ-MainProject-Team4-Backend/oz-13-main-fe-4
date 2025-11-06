import { Box, Container, styled, Typography } from '@mui/material';

// MainPage Styles
export const MainContainer = styled(Container)({
  paddingTop: '24px',
  paddingBottom: '24px',
  minWidth: '90vw',
});

export const ComponentsGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '20px',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
  },
});
export const PlaceholderCard = styled(Box)({
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  padding: '20px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  minHeight: '200px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#CCCCCC',
  fontSize: '14px',
});
export const FullWidthCard = styled(PlaceholderCard)({
  gridColumn: '1 / -1',
  minHeight: '120px',
});

export const RecommendCard = styled(PlaceholderCard)({
  minHeight: '350px',
  gridColumn: '1 / -1',
});

// CurrentWeather Section Styles
export const WeatherCard = styled(Box)({
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  minHeight: '350px',
  padding: '20px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

export const CurrentWeatherCardHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const LocationText = styled(Typography)({
  fontSize: '16px',
  fontWeight: 600,
  color: '#333333',
});

export const TemperatureSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});

export const WeatherIcon = styled(Box)({
  fontSize: '48px',
  color: '#B0BEC5',
});

export const Temperature = styled(Typography)({
  fontSize: '48px',
  fontWeight: 700,
  color: '#333333',
});

export const WeatherCondition = styled(Typography)({
  fontSize: '18px',
  paddingLeft: '4px',
  color: '#666666',
  textAlign: 'left',
  marginTop: '0px',
});

export const InfoGroup = styled(Box)({
  display: 'flex',
  gap: '20px',
  marginTop: '3rem',
});

export const InfoBox = styled(Box)({
  backgroundColor: '#5B9EFF',
  borderRadius: '30px',
  padding: '12px 20px',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100px',
  gap: '4px',
});

export const InfoLabel = styled(Typography)({
  fontSize: '16px',
  color: '#ffffff',
  fontWeight: 400,
});

export const InfoValue = styled(Typography)({
  marginTop: '0.7rem',
  fontSize: '40px',
  color: '#ffffff',
  fontWeight: 600,
});
