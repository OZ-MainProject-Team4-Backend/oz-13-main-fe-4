import { useEffect, useState } from 'react';
import { DiaryData, UseDiaryModalProps } from '../types/types';
import { getFormattedDate } from '../utils/calendarUtils';
import { MOODS } from '../constants/moods';

export const useDiaryModal = ({
  mode,
  selectedDate,
  selectedDiary,
  onSave,
  onClose,
}: UseDiaryModalProps) => {
  const [diary, setDiary] = useState<DiaryData>({
    id: Date.now(),
    date: getFormattedDate(selectedDate),
    title: '',
    satisfaction: MOODS[0],
    notes: '',
    weather: {
      condition: 'cloudy',
      temperature: 18,
    },
    image_url: null,
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && selectedDiary) {
      // 수정 모드
      setDiary(selectedDiary);
      setPreview(selectedDiary.image_url || null);
      setImage(null);
    } else {
      // 작성 모드
      setDiary({
        id: Date.now(),
        date: getFormattedDate(selectedDate),
        title: '',
        satisfaction: MOODS[0],
        notes: '',
        weather: {
          condition: 'cloudy',
          temperature: 18,
        },
        image_url: null,
      });
      setPreview(null);
      setImage(null);
    }
  }, [mode, selectedDiary, selectedDate]);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // 이전 미리보기 url 해제
    if (preview) URL.revokeObjectURL(preview);

    // 새 미리보기 url 생성
    const newUrl = URL.createObjectURL(file);
    setPreview(newUrl);
    setImage(file);

    setDiary((prev) => ({
      ...prev,
      image_url: newUrl,
    }));
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiary((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const handleNotes = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiary((prev) => ({
      ...prev,
      notes: e.target.value,
    }));
  };

  const handleMood = (mood: string) => {
    setDiary((prev) => ({
      ...prev,
      satisfaction: mood,
    }));
  };

  const handleCancel = () => {
    const hasChanges =
      mode === 'create'
        ? diary.title || diary.notes || image
        : JSON.stringify(diary) !== JSON.stringify(selectedDiary) || image;

    if (hasChanges) {
      const confirmClose = window.confirm('작성 중인 내용이 있습니다. 정말 닫으시겠습니까?');
      if (!confirmClose) return;
    }

    onClose();
  };

  const handleSave = () => {
    if (!onSave) return;

    if (!diary.title.trim()) {
      alert('제목을 입력해주세요');
      return;
    }

    if (!diary.notes.trim()) {
      alert('일기 내용을 입력해주세요');
      return;
    }

    setIsLoading(true);

    onSave(diary, image);
    setIsLoading(false);
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return {
    diary,
    preview,
    isLoading,
    handleImage,
    handleTitle,
    handleNotes,
    handleMood,
    handleSave,
    handleCancel,
  };
};
