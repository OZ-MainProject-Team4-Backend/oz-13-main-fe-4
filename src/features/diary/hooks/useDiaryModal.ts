import { useEffect, useState } from 'react';
import { DiaryData, DiaryError, UseDiaryModalProps } from '../types/types';
import { getFormattedDate } from '../utils/calendar';

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
    emotion: 0,
    notes: '',
    weather: {
      condition: 'cloudy',
      temperature: 18,
      icon: 0,
    },
    image_url: null,
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<DiaryError>({});
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
        emotion: 0,
        notes: '',
        weather: {
          condition: 'cloudy',
          temperature: 18,
          icon: 0,
        },
        image_url: null,
      });
      setPreview(null);
      setImage(null);
    }

    setErrors({});
  }, [mode, selectedDiary, selectedDate]);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // 이전 미리보기 url 해제
    if (preview && preview.startsWith('blob:')) URL.revokeObjectURL(preview);

    // 새 미리보기 url 생성
    const newUrl = URL.createObjectURL(file);
    setPreview(newUrl);
    setImage(file);
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

  const handleEmotion = (index: number) => {
    setDiary((prev) => ({
      ...prev,
      emotion: index,
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

    const newErrors: DiaryError = {};

    if (!diary.title.trim()) newErrors.title = '제목을 입력해주세요';
    if (!diary.notes.trim()) newErrors.notes = '일기 내용을 입력해주세요';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    onSave(diary, image);
    setIsLoading(false);
  };

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith('blob:')) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return {
    diary,
    preview,
    isLoading,
    errors,
    handleImage,
    handleTitle,
    handleNotes,
    handleEmotion,
    handleSave,
    handleCancel,
  };
};
