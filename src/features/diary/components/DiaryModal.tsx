import { IoClose, IoImageOutline } from 'react-icons/io5';
import BaseModal from '../../../components/Modal/BaseModal';
import * as styles from './DiaryModal.styles';
import { SiAccuweather } from 'react-icons/si';
import { Box, Button, TextField } from '@mui/material';

interface DiaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
}

const MOODS = ['😊', '😆', '😌', '😢', '😠'];

const DiaryModal = ({ isOpen, onClose, selectedDate }: DiaryModalProps) => {
  const formattedDate = selectedDate
    ? `${selectedDate.getFullYear()}년 ${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일`
    : '';

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div css={styles.modalContainer}>
        {/* 헤더 */}
        <div css={styles.header}>
          <h3 css={styles.dateTitle}>{formattedDate}</h3>
          <button type='button' css={styles.closeButton} onClick={onClose}>
            <IoClose />
          </button>
        </div>

        {/* 이미지 */}
        <div css={styles.imageDisplay}>
          <div css={styles.uploadPlaceholder}>
            <IoImageOutline />
            <span>사진 추가하기</span>
          </div>
        </div>

        {/* 제목 */}
        <Box css={styles.titleWrapper}>
          <TextField fullWidth id='diary-title' label='제목' variant='standard' />
        </Box>

        {/* 날씨 */}
        <div css={styles.weatherSection}>
          <SiAccuweather css={styles.weatherIcon} />
          <div css={styles.weatherText}>
            <h3>23°C</h3>
            <p>맑음</p>
          </div>
        </div>

        {/* 기분 */}
        <div css={styles.moodSection}>
          <div css={styles.moodTitle}>오늘의 기분</div>
          <div css={styles.moodContainer}>
            {MOODS.map((mood, index) => (
              <button key={index} type='button' css={styles.moodButton}>
                {mood}
              </button>
            ))}
          </div>
        </div>

        {/* 본문 */}
        <Box css={styles.inputWrapper}>
          <TextField fullWidth id='diary-content' label='일기 작성' multiline rows={4} />
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
