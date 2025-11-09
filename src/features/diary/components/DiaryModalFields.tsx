import { IoImageOutline } from 'react-icons/io5';
import * as styles from './DiaryModal.styles';
import { Box, TextField } from '@mui/material';
import { DiaryModalFieldsProps } from '../types/types';
import { SiAccuweather } from 'react-icons/si';
import { MOODS } from '../constants/moods';

const DiaryModalFields = ({
  handleImage,
  preview,
  handleTitle,
  diary,
  handleMood,
  handleNotes,
}: DiaryModalFieldsProps) => {
  return (
    <>
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
          ) : diary.image_url ? (
            <img src={diary.image_url} alt='저장된 이미지' />
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
              css={[styles.moodButton, diary.satisfaction === index && styles.moodButtonSelected]}
              onClick={() => handleMood(index)}
            >
              <img src={mood.icon} alt={mood.name} />
            </button>
          ))}
        </div>
      </div>

      {/* 내용 */}
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
    </>
  );
};

export default DiaryModalFields;
