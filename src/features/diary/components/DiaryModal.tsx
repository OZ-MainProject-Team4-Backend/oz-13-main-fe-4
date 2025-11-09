import BaseModal from '../../../components/Modal/BaseModal';
import * as styles from './DiaryModal.styles';
import { DiaryModalProps } from '../types/types';
import { useDiaryModal } from '../hooks/useDiaryModal';
import DiaryModalHeader from './DiaryModalHeader';
import DiaryModalActions from './DiaryModalActions';
import DiaryModalFields from './DiaryModalFields';

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
        <DiaryModalHeader date={diary.date} />

        {/* 입력 필드들 */}
        <DiaryModalFields
          handleImage={handleImage}
          preview={preview}
          handleTitle={handleTitle}
          diary={diary}
          handleMood={handleMood}
          handleNotes={handleNotes}
        />

        {/* 버튼 */}
        <DiaryModalActions
          isLoading={isLoading}
          handleCancel={handleCancel}
          handleSave={handleSave}
          mode={mode}
        />
      </div>
    </BaseModal>
  );
};

export default DiaryModal;
