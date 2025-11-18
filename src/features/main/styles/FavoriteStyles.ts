// src/pages/main/styles/FavoriteStyles.ts
import { Box, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

// ============================================
// FavoritesSection 스타일
// ============================================

export const FavoritesSectionContainer = styled('div')({
  gridColumn: '1 / -1',
  backgroundColor: '#FFF',
  borderRadius: '16px',
  padding: '24px 40px', // 좌우 여백 증가
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
});

export const FavoritesSectionHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '24px',
});

export const FavoritesSectionFlexLayout = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)', // 3개 고정 영역
  gap: '24px',
  '@media (max-width: 1024px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
  },
});

export const FavoritesSectionCardSlot = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '200px',
});

export const FavoritesSectionAddButton = styled('button')({
  width: '200px',
  height: '200px',
  backgroundColor: '#1E3A8A',
  color: '#FFF',
  fontSize: '48px',
  border: 'none',
  borderRadius: '12px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor: '#1E40AF',
    transform: 'scale(1.05)',
  },
  '&:active': {
    transform: 'scale(0.95)',
  },
});

// ============================================
// FavoriteLocationCard 스타일
// ============================================

export const FavoriteCardContainer = styled(Box)<{ isSelected: boolean }>(({ isSelected }) => ({
  width: '200px', // 240px → 200px (더 컴팩트)
  flexShrink: 0,
  backgroundColor: isSelected ? '#E3F2FD' : '#FFF',
  border: isSelected ? '3px solid #1976D2' : '2px solid #E0E0E0',
  borderRadius: '12px',
  padding: '16px',
  cursor: 'pointer',
  transition: 'all 0.2s',
  '&:hover': {
    borderColor: '#1976D2',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
}));

export const FavoriteCardHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '12px',
});

export const FavoriteCardDragHandle = styled(Box)({
  cursor: 'grab',
  display: 'flex',
  alignItems: 'center',
  color: '#999',
  '&:active': {
    cursor: 'grabbing',
  },
});

export const FavoriteCardAliasText = styled(Typography)({
  fontSize: '16px',
  fontWeight: 700,
  color: '#333',
  textAlign: 'center',
  marginBottom: '12px',
  wordBreak: 'keep-all', // 한글 줄바꿈 방지
});

export const FavoriteCardLocationText = styled(Typography)({
  fontSize: '12px',
  color: '#666',
  marginBottom: '12px',
});

export const FavoriteCardWeatherRow = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '8px 12px',
  backgroundColor: '#E3F2FD',
  borderRadius: '8px',
  marginBottom: '4px',
});

export const FavoriteCardWeatherLabel = styled(Typography)({
  fontSize: '13px',
  color: '#666',
});

export const FavoriteCardWeatherValue = styled(Typography)({
  fontSize: '14px',
  fontWeight: 600,
  color: '#1976D2',
});

export const FavoriteCardActionButtons = styled(Box)({
  display: 'flex',
  gap: '4px',
});

// ============================================
// FavoriteLocationOutfitRecommendation 스타일
// ============================================

export const OutfitRecommendationContainer = styled(Box)({
  border: '3px solid #1976D2',
  borderRadius: '16px',
  padding: '32px',
  backgroundColor: '#FFF', // 테두리 안만 하얀색
});

export const OutfitRecommendationHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '24px',
});

export const OutfitRecommendationTitle = styled(Typography)({
  fontSize: 20,
  fontWeight: 700,
  color: '#333',
});

export const OutfitRecommendationSubtitle = styled(Typography)({
  fontSize: 14,
  color: '#666',
  marginBottom: '24px',
});

export const OutfitRecommendationItemContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
});

export const OutfitRecommendationIndicatorContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  gap: '8px',
  marginTop: '16px',
});

export const OutfitRecommendationIndicatorDot = styled(Box)<{ active: boolean }>(({ active }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: active ? '#1976D2' : '#CCCCCC',
  cursor: 'pointer',
  transition: 'all 0.2s',
  '&:hover': {
    transform: 'scale(1.2)',
    backgroundColor: active ? '#1976D2' : '#999999',
  },
}));

// ============================================
// EmptyFavorites 스타일 (기존 것 유지)
// ============================================

export const EmptyFavoritesContainer = styled('div')({
  gridColumn: '1 / -1',
  backgroundColor: '#E3F2FD',
  borderRadius: '16px',
  padding: '40px 32px',
  minHeight: '500px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '32px',
});

export const EmptyFavoritesHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  alignSelf: 'flex-start',
});

export const EmptyFavoritesAddButton = styled('button')({
  width: '120px',
  height: '120px',
  backgroundColor: '#1E3A8A',
  color: '#FFF',
  fontSize: '48px',
  border: 'none',
  borderRadius: '16px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor: '#1E40AF',
    transform: 'scale(1.05)',
  },
  '&:active': {
    transform: 'scale(0.95)',
  },
});

export const EmptyFavoritesBenefitsBox = styled(Box)({
  backgroundColor: '#FFF',
  borderRadius: '16px',
  padding: '32px',
  width: '100%',
  maxWidth: '800px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
});

export const EmptyFavoritesTitle = styled(Typography)({
  fontSize: '20px',
  fontWeight: 700,
  color: '#333',
  textAlign: 'center',
  marginBottom: '8px',
});

export const EmptyFavoritesSubtitle = styled(Typography)({
  fontSize: '14px',
  color: '#666',
  textAlign: 'center',
  marginBottom: '32px',
});

export const EmptyFavoritesBenefitsGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '24px',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
  },
});

export const EmptyFavoritesBenefitCard = styled(Box)({
  backgroundColor: '#E3F2FD',
  borderRadius: '12px',
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: '12px',
});

export const EmptyFavoritesIconCircle = styled(Box)({
  width: '56px',
  height: '56px',
  borderRadius: '50%',
  backgroundColor: '#1976D2',
  color: '#FFF',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '28px',
  marginBottom: '8px',
});

export const EmptyFavoritesBenefitTitle = styled(Typography)({
  fontSize: '16px',
  fontWeight: 700,
  color: '#333',
});

export const EmptyFavoritesBenefitDescription = styled(Typography)({
  fontSize: '13px',
  color: '#666',
  lineHeight: '1.5',
});
