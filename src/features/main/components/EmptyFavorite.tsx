import { useState } from 'react';
import { Typography } from '@mui/material';
import { AxiosError } from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { addFavorite } from '../../favorite/api/favoriteAPI';
import FavoriteRegionModal from '../../../components/Modal/FavoriteRegionModal';
import {
  EmptyFavoritesAddButton,
  EmptyFavoritesBenefitCard,
  EmptyFavoritesBenefitDescription,
  EmptyFavoritesBenefitsBox,
  EmptyFavoritesBenefitsGrid,
  EmptyFavoritesContainer,
  EmptyFavoritesHeader,
  EmptyFavoritesIconCircle,
  EmptyFavoritesSubtitle,
  EmptyFavoritesTitle,
} from '../styles/FavoriteStyles';

interface EmptyFavoritesProps {
  onSuccess: () => void;
  onError: (message: string) => void;
}

export const EmptyFavorites = ({ onSuccess, onError }: EmptyFavoritesProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddClick = () => {
    setModalOpen(true);
  };

  const handleSave = async (data: { city: string; district: string; alias?: string }) => {
    setLoading(true);
    try {
      await addFavorite(data);
      setModalOpen(false);
      onSuccess();
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string; message: string }>;
      const message = axiosError.response?.data?.message || '추가에 실패했습니다.';
      onError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <EmptyFavoritesContainer>
        <EmptyFavoritesHeader>
          <FavoriteIcon sx={{ color: '#EF5350', fontSize: 20 }} />
          <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#333' }}>
            즐겨 찾는 지역
          </Typography>
        </EmptyFavoritesHeader>
        <EmptyFavoritesAddButton onClick={handleAddClick} disabled={loading}>
          +
        </EmptyFavoritesAddButton>
        <EmptyFavoritesBenefitsBox>
          <EmptyFavoritesTitle>즐겨찾는 지역을 추가해보세요!</EmptyFavoritesTitle>

          <EmptyFavoritesSubtitle>
            자주 가는 장소의 날씨를 한눈에 확인하고, 맞춤 의상을 추천받으세요
          </EmptyFavoritesSubtitle>

          <EmptyFavoritesBenefitsGrid>
            <EmptyFavoritesBenefitCard>
              <EmptyFavoritesIconCircle>🎯</EmptyFavoritesIconCircle>
              <EmptyFavoritesTitle>최대 3곳 등록</EmptyFavoritesTitle>
              <EmptyFavoritesBenefitDescription>
                집, 회사, 자주 가는 장소 등 날씨가 중요한 장소를 등록하세요
              </EmptyFavoritesBenefitDescription>
            </EmptyFavoritesBenefitCard>
            <EmptyFavoritesBenefitCard>
              <EmptyFavoritesIconCircle>💡</EmptyFavoritesIconCircle>
              <EmptyFavoritesTitle>맞춤 의상 추천</EmptyFavoritesTitle>
              <EmptyFavoritesBenefitDescription>
                각 지역의 날씨를 분석해 맞춤형 코디를 제안드려요
              </EmptyFavoritesBenefitDescription>
            </EmptyFavoritesBenefitCard>
            <EmptyFavoritesBenefitCard>
              <EmptyFavoritesIconCircle>⭐</EmptyFavoritesIconCircle>
              <EmptyFavoritesTitle>별칭 설정</EmptyFavoritesTitle>
              <EmptyFavoritesBenefitDescription>
                "본가", "회사", "피부과" 등 편한 이름으로 저장하세요
              </EmptyFavoritesBenefitDescription>
            </EmptyFavoritesBenefitCard>
          </EmptyFavoritesBenefitsGrid>
        </EmptyFavoritesBenefitsBox>
      </EmptyFavoritesContainer>
      <FavoriteRegionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </>
  );
};
