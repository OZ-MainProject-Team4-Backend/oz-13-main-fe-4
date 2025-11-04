import { useCallback, useState } from 'react';
import { GeolocationPosition, getCurrentPosition } from '../utils/geolocation';

export const useCurrentLocation = () => {
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLocation = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const position = await getCurrentPosition();
      setLocation(position);
      return position;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '위치를 가져올 수 없습니다.';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  return { location, loading, error, fetchLocation };
};
