import { Box, Icon, Typography } from '@mui/material';
import ThumbUp from '@mui/icons-material/ThumbUp';
import {
  ClothingIconPlaceholder,
  OutfitCard,
  OutfitGrid,
  OutfitHeader,
  OutfitItem,
  OutfitTitle,
  PlusIcon,
  StyleLabel,
  TemperatureInfo,
} from '../styles/MainPageContentStyles';

interface TodayOutfitRecommendationProps {
  temperature: number;
  outfits?: Array<{
    id: string;
    imageUrl?: string;
    type: string;
  }>;
}

export const TodayOutfitRecommendation = ({
  temperature,
  outfits = [],
}: TodayOutfitRecommendationProps) => {
  // 기본 3개 아이템 생성 (데이터 없을 시)
  const displayOutfits = outfits.length > 0 ? outfits : Array(3).fill(null);

  return (
    <OutfitCard>
      <OutfitHeader>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ThumbUp sx={{ color: '#5B9EFF', fontSize: 28 }} />
          {/* <Icon sx={{ color: '#5B9EFF', fontSize: 28 }}>👕</Icon> */}
          <OutfitTitle>오늘의 추천 코디</OutfitTitle>
        </Box>
        <TemperatureInfo>{temperature}°C 맞춤</TemperatureInfo>
      </OutfitHeader>

      <StyleLabel>ㅁㅁㅁㅁ 스타일</StyleLabel>

      <OutfitGrid>
        {displayOutfits.map((outfit, index) => (
          <>
            <OutfitItem key={outfit?.id || index}>
              {outfit?.imageUrl ? (
                <img
                  src={outfit.imageUrl}
                  alt={outfit.type}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <ClothingIconPlaceholder>
                  {/* 의상 아이콘이 여기 들어갈 예정 */}
                </ClothingIconPlaceholder>
              )}
            </OutfitItem>
            {index < displayOutfits.length - 1 && <PlusIcon>+</PlusIcon>}
          </>
        ))}
      </OutfitGrid>
    </OutfitCard>
  );
};
