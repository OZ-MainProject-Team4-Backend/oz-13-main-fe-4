import { Box, Button, Container, styled, Typography } from '@mui/material';

// MainPage Styles--------------------------------------
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

// CurrentWeather Section Styles---------------------------------------
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

// Today Outfit Recommendation---------------------------------------
export const OutfitCard = styled(Box)({
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  padding: '32px 40px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  minHeight: '350px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

export const OutfitHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '8px',
});

export const OutfitTitle = styled(Typography)({
  fontSize: '24px',
  fontWeight: 700,
  color: '#333333',
});

export const TemperatureInfo = styled(Typography)({
  fontSize: '18px',
  fontWeight: 500,
  color: '#333333',
});

export const StyleLabel = styled(Typography)({
  fontSize: '18px',
  fontWeight: 400,
  color: '#666666',
  textAlign: 'center',
  marginBottom: '12px',
});

export const OutfitGrid = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '32px',
  flex: 1,
});

export const OutfitItem = styled(Box)({
  backgroundColor: '#C8DDFF',
  borderRadius: '16px',
  width: '180px',
  height: '240px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  '@media (max-width: 768px)': {
    width: '100px',
    height: '130px',
  },
});

export const PlusIcon = styled(Typography)({
  fontSize: '40px',
  fontWeight: 300,
  color: '#999999',
  marginTop: '-20px',
});

export const ClothingIconPlaceholder = styled(Box)({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#5B9EFF',
  fontSize: '48px',
});

// Hourly Weather ------------------------------------------------
export const HourlyWeatherCard = styled(Box)({
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  padding: '20px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  gridColumn: '1 / -1',
  minHeight: '120px',
  overflow: 'hidden',
});

export const HourlyContainer = styled(Box)({
  display: 'flex',
  gap: '36px',
  width: '100%',
  justifyContent: 'stretch',
});

export const HourlyItem = styled(Box)({
  backgroundColor: '#C8DDFF',
  borderRadius: '12px',
  height: '120px',
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4px',
});

export const HourLabel = styled(Typography)({
  fontSize: '14px',
  fontWeight: 500,
  color: '#333333',
});

export const WeatherIconBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const TemperatureLabel = styled(Typography)({
  fontSize: '18px',
  fontWeight: 600,
  color: '#333333',
});
