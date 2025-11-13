import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// ============================================
// 공통 스타일
// ============================================

export const MainContainer = styled(Box)({
  width: '100%',
  maxWidth: '1440px',
  margin: '0 auto',
  padding: '40px 24px',
  '@media (max-width: 768px)': {
    padding: '24px 16px',
  },
});

export const ComponentsGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '24px',
  '@media (max-width: 1024px)': {
    gridTemplateColumns: '1fr',
  },
});

export const PlaceholderCard = styled(Box)({
  backgroundColor: '#f5f5f5',
  borderRadius: '16px',
  padding: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '200px',
  color: '#999999',
  fontSize: '18px',
  fontWeight: 500,
});

export const FullWidthCard = styled(Box)({
  backgroundColor: '#f5f5f5',
  borderRadius: '16px',
  padding: '40px',
  gridColumn: '1 / -1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '150px',
  color: '#999999',
  fontSize: '18px',
  fontWeight: 500,
});

// ============================================
// CurrentWeather 컴포넌트 스타일
// ============================================

export const WeatherCard = styled(Box)({
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  padding: '32px 40px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

export const CurrentWeatherCardHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const LocationText = styled(Typography)({
  fontSize: '24px',
  fontWeight: 700,
  color: '#333333',
});

export const TemperatureSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
});

export const Temperature = styled(Typography)({
  fontSize: '48px',
  fontWeight: 700,
  color: '#333333',
});

export const WeatherCondition = styled(Typography)({
  fontSize: '18px',
  fontWeight: 500,
  color: '#666666',
});

export const InfoGroup = styled(Box)({
  display: 'flex',
  gap: '32px',
  paddingTop: '16px',
  borderTop: '1px solid #e0e0e0',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    gap: '16px',
  },
});

export const InfoBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

export const InfoLabel = styled(Typography)({
  fontSize: '14px',
  fontWeight: 500,
  color: '#999999',
});

export const InfoValue = styled(Typography)({
  fontSize: '18px',
  fontWeight: 600,
  color: '#333333',
});

// ============================================
// TodayOutfitRecommendation 컴포넌트 스타일
// ============================================

export const OutfitCard = styled(Box)({
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  padding: '32px 40px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  minHeight: '350px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
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

export const OutfitGridContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',
  flex: 1,
  position: 'relative',
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

export const NavigationButton = styled(Box)({
  backgroundColor: '#F5F5F5',
  color: '#5B9EFF',
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  cursor: 'pointer',
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor: '#E0E0E0',
    color: '#4A8EEE',
  },
  '&:active': {
    backgroundColor: '#D0D0D0',
  },
  '@media (max-width: 768px)': {
    width: '36px',
    height: '36px',
  },
});

export const IndicatorContainer = styled(Box)({
  display: 'flex',
  gap: '8px',
  justifyContent: 'center',
  marginTop: '8px',
});

// ============================================
// HourlyForecast 컴포넌트 스타일
// ============================================

export const HourlyWeatherCard = styled(Box)({
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  padding: '32px 24px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  gridColumn: '1 / -1',
  overflow: 'hidden',
});

export const HourlyScrollContainer = styled(Box)({
  display: 'flex',
  gap: '24px',
  overflowX: 'auto',
  overflowY: 'hidden',
  paddingBottom: '16px',
  cursor: 'grab',
  userSelect: 'none',
  '&:active': {
    cursor: 'grabbing',
  },
  '&::-webkit-scrollbar': {
    height: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#c1c1c1',
    borderRadius: '4px',
    '&:hover': {
      background: '#a8a8a8',
    },
  },
});

export const HourlyItem = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '12px',
  minWidth: '80px',
  flexShrink: 0,
});

export const HourLabel = styled(Typography)({
  fontSize: '14px',
  fontWeight: 500,
  color: '#666666',
});

export const WeatherIconBox = styled(Box)({
  width: '48px',
  height: '48px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '32px',
});

export const TemperatureLabel = styled(Typography)({
  fontSize: '16px',
  fontWeight: 600,
  color: '#333333',
});
