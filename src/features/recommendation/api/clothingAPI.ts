import { instance } from '../../../axios/instance';

export interface OutfitRecommendation {
  rec_1: string;
  rec_2: string;
  rec_3: string;
  explanation: string;
}

export const outfitAPI = {
  // 좌표 기반 의상 추천 (현재 날씨용) 1118 현재 500 에러 발생
  getRecommendationByCoords: async (lat: number, lon: number) => {
    const response = await instance.get<OutfitRecommendation>(
      `/recommend/outfit?lat=${lat}&lon=${lon}`
    );
    return response.data;
  },

  // 주소 기반 의상 추천 (즐겨찾기 지역용) 1118 현재 500에러 발생
  getRecommendationByLocation: async (location: string) => {
    const response = await instance.get<OutfitRecommendation>(
      `/recommend/outfit?location=${location}`
    );
    return response.data;
  },
};
