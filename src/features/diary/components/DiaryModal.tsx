import { IoClose, IoImageOutline } from 'react-icons/io5';
import BaseModal from '../../../components/Modal/BaseModal';
import * as styles from './DiaryModal.styles';
import { SiAccuweather } from 'react-icons/si';
import { Box, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { DiaryData } from '../types/types';
import { getFormattedDate } from '../utils/calendarUtils';

interface DiaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  onSave?: (diary: DiaryData, image: File | null) => void;
  mode: 'create' | 'edit';
  selectedDiary: DiaryData | undefined;
}

const MOODS = ['😊', '😆', '😌', '😢', '😠'];

const DiaryModal = ({
  isOpen,
  onClose,
  selectedDate,
  onSave,
  mode,
  selectedDiary,
}: DiaryModalProps) => {
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
    if (!isOpen) return;

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
  }, [isOpen, mode, selectedDiary, selectedDate]);

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

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div css={styles.modalContainer}>
        {/* 헤더 */}
        <div css={styles.header}>
          <h3 css={styles.dateTitle}>{diary.date}</h3>
        </div>

        {/* 이미지 */}
        <div css={styles.imageContainer}>
          <input
            type='file'
            accept='image/*'
            id='upload-input'
            onChange={handleImage}
            css={styles.fileInput}
          />
          <label htmlFor='upload-input' css={styles.imageLabel}>
            {preview ? (
              <img src={preview!} alt='미리보기' width={'100%'} css={styles.previewImage} />
            ) : (
              <div css={styles.uploadPlaceholder}>
                <IoImageOutline />
                <span>사진 추가하기</span>
              </div>
            )}
          </label>
        </div>

        {/* 제목 */}
        <Box css={styles.titleWrapper}>
          <TextField
            fullWidth
            id='diary-title'
            label='제목'
            variant='standard'
            onChange={handleTitle}
            value={diary.title}
          />
        </Box>

        {/* 날씨 */}
        <div css={styles.weatherSection}>
          <SiAccuweather css={styles.weatherIcon} />
          <div css={styles.weatherText}>
            <h3>{diary.weather.temperature}°C</h3>
            <p>{diary.weather.condition}</p>
          </div>
        </div>

        {/* 기분 */}
        <div css={styles.moodSection}>
          <div css={styles.moodTitle}>오늘의 기분</div>
          <div css={styles.moodContainer}>
            {MOODS.map((mood, index) => (
              <button
                key={index}
                type='button'
                css={styles.moodButton}
                onClick={() => handleMood(mood)}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>

        {/* 본문 */}
        <Box css={styles.inputWrapper}>
          <TextField
            fullWidth
            id='diary-content'
            label='일기 작성'
            multiline
            rows={4}
            onChange={handleNotes}
            value={diary.notes}
          />
        </Box>
        {/* 버튼 */}
        <div css={styles.buttonWrapper}>
          <Button variant='outlined' color='primary' disabled={isLoading} onClick={handleCancel}>
            취소
          </Button>
          <Button variant='contained' color='primary' onClick={handleSave} disabled={isLoading}>
            {mode === 'edit' ? '수정 완료' : '저장'}
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};

export default DiaryModal;
