import { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { AxiosError } from 'axios';
import { CurrentWeather } from './components/CurrentWeather';

import { HourlyWeather } from './components/HourlyWeather';
import { TodayOutfitRecommendation } from './components/TodayOutfitRecommendation';
import {
  getFavorites,
  deleteFavorite,
  updateFavoriteAlias,
  reorderFavorites,
  type FavoriteLocation,
} from '../../features/favorite/api/favoriteAPI';
import {
  ComponentsGrid,
  FullWidthCard,
  MainContainer,
  RecommendCard,
} from './styles/MainPageContentStyles';
import { EmptyFavorites } from './components/EmptyFavorite';
import FavoriteRegionModal from '../../components/Modal/FavoriteRegionModal';
import { FavoritesSection } from './components/FavoriteSection';
import { FavoriteLocationOutfitRecommendation } from './components/FavoriteLocationOutfitRecommendation';
import { AIRecommendation } from './components/AIRecommendation';

const MAX_FAVORITES = 3;

export const MainPage = () => {
  const [favorites, setFavorites] = useState<FavoriteLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFavorite, setEditingFavorite] = useState<FavoriteLocation | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  // 초기 데이터 로드
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const data = await getFavorites();
      setFavorites(data);
    } catch (error) {
      console.error('즐겨찾기 로드 실패:', error);
      showSnackbar('즐겨찾기를 불러올 수 없습니다.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // EmptyFavorites에서 추가 성공 시
  const handleAddSuccess = () => {
    loadFavorites();
    showSnackbar('추가되었습니다.', 'success');
  };

  // EmptyFavorites에서 에러 발생 시
  const handleAddError = (message: string) => {
    showSnackbar(message, 'error');
  };

  // + 버튼 클릭 (FavoritesSection에서)
  const handleAddClick = () => {
    if (favorites.length >= MAX_FAVORITES) {
      showSnackbar('즐겨찾기는 최대 3개까지 등록 가능합니다.', 'error');
      return;
    }
    setEditingFavorite(null);
    setModalOpen(true);
  };

  // 수정
  const handleEdit = (favorite: FavoriteLocation) => {
    setEditingFavorite(favorite);
    setModalOpen(true);
  };

  // 삭제
  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await deleteFavorite(id);
      setFavorites((prev) => prev.filter((item) => item.id !== id));
      showSnackbar('삭제되었습니다.', 'success');
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string; message: string }>;
      const message = axiosError.response?.data?.message || '삭제에 실패했습니다.';
      showSnackbar(message, 'error');
    }
  };

  // 순서 변경
  const handleReorder = async (newFavorites: FavoriteLocation[]) => {
    const oldFavorites = [...favorites];
    setFavorites(newFavorites);

    try {
      const reorderData = newFavorites.map((item, index) => ({
        id: item.id,
        order: index,
      }));
      await reorderFavorites(reorderData);
      showSnackbar('순서가 변경되었습니다.', 'success');
    } catch (error) {
      setFavorites(oldFavorites);
      showSnackbar('순서 변경에 실패했습니다.', 'error');
    }
  };

  // 수정 제출
  const handleUpdate = async (data: { city: string; district: string; alias: string }) => {
    if (!editingFavorite) return;

    try {
      await updateFavoriteAlias(editingFavorite.id, { alias: data.alias });
      setFavorites((prev) =>
        prev.map((item) => (item.id === editingFavorite.id ? { ...item, alias: data.alias } : item))
      );
      showSnackbar('수정되었습니다.', 'success');
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string; message: string }>;
      const message = axiosError.response?.data?.message || '수정에 실패했습니다.';
      throw new Error(message);
    }
  };

  // 스낵바 표시
  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  if (loading) {
    return <MainContainer>로딩 중...</MainContainer>;
  }

  return (
    <MainContainer>
      <ComponentsGrid>
        <CurrentWeather
          location='서울'
          temperature={18}
          condition='scattered clouds'
          iconCode='03d'
          precipitation={30}
          feelsLike={16}
          onEditLocation={() => {
            console.log('위치 변경');
          }}
        />
        <TodayOutfitRecommendation temperature={18} />
        <HourlyWeather hourlyData={[]} />

        <AIRecommendation temperature={15} condition={'clear'} location={'seoul'} />

        {/* 하단 추가 정보 */}
        <FullWidthCard>지금, ○○○경기장에 가시는건가요?</FullWidthCard>
        <FullWidthCard>AI 추천 문구</FullWidthCard>
        {favorites.length === 0 ? (
          <EmptyFavorites onSuccess={handleAddSuccess} onError={handleAddError} />
        ) : (
          <>
            <FavoritesSection
              favorites={favorites}
              onAddClick={handleAddClick}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onReorder={handleReorder}
            />
            <RecommendCard>
              <FavoriteLocationOutfitRecommendation favorite={favorites[0]} temperature={18} />
            </RecommendCard>
          </>
        )}
      </ComponentsGrid>
      <FavoriteRegionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleUpdate}
        editingFavorite={editingFavorite}
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </MainContainer>
  );
};
