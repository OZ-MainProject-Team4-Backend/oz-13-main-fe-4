import { IoImageOutline } from 'react-icons/io5';
import BaseModal from '../../../components/Modal/BaseModal';
import * as styles from './DiaryModal.styles';
import { SiAccuweather } from 'react-icons/si';
import { Box, Button, TextField } from '@mui/material';
import { DiaryModalProps } from '../types/types';
import { useDiaryModal } from '../hooks/useDiaryModal';
import { MOODS } from '../constants/moods';

const DiaryModal = ({
  isOpen,
  onClose,
  selectedDate,
  onSave,
  mode,
  selectedDiary,
}: DiaryModalProps) => {
  const {
    diary,
    preview,
    isLoading,
    handleImage,
    handleTitle,
    handleNotes,
    handleMood,
    handleSave,
    handleCancel,
  } = useDiaryModal({ mode, selectedDate, selectedDiary, onSave, onClose });

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
