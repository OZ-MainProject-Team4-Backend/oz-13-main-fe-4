import { IoClose, IoImageOutline } from 'react-icons/io5';
import BaseModal from '../../../components/Modal/BaseModal';
import * as styles from './DiaryModal.styles';
import { SiAccuweather } from 'react-icons/si';
import { Box, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

interface DiaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
}

const getFormattedDate = (selectedDate: Date | null) => {
  if (!selectedDate) return '';
  const formatetedDate = `${selectedDate.getFullYear()}년 ${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일`;
  return formatetedDate;
};

const MOODS = ['😊', '😆', '😌', '😢', '😠'];

export interface DiaryData {
  id: number;
  date: string;
  title: string;
  satisfaction: string;
  notes: string;
  weather: {
    condition: string;
    temperature: number;
  };
  image_url: string | null;
}

const DiaryModal = ({ isOpen, onClose, selectedDate }: DiaryModalProps) => {
  const [diary, setDiary] = useState<DiaryData>({
    id: 1,
    date: getFormattedDate(selectedDate),
    title: 'ozcoding',
    satisfaction: MOODS[0],
    notes: 'main project',
    weather: {
      condition: 'cloudy',
      temperature: 18,
    },
    image_url: null,
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

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
          <button type='button' css={styles.closeButton} onClick={onClose}>
            <IoClose />
          </button>
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
          <Button variant='outlined' color='primary'>
            취소
          </Button>
          <Button variant='contained' color='primary'>
            수정 완료
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};

export default DiaryModal;
