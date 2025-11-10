import BaseModal from '../../../components/Modal/BaseModal';
import * as styles from './DiaryModal.styles';
import { DiaryModalProps } from '../types/types';
import { useDiaryModal } from '../hooks/useDiaryModal';
import DiaryModalHeader from './DiaryModalHeader';
import DiaryModalActions from './DiaryModalActions';
import DiaryModalFields from './DiaryModalFields';
import DeleteConfirmModal from '../../../components/Modal/DeleteConfirmModal';

const DiaryModal = ({
  isOpen,
  onClose,
  selectedDate,
  onSave,
  mode,
  selectedDiary,
  onModalChange,
  deleteDiary,
}: DiaryModalProps) => {
  const {
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
    handleDelete,
    handleConfirmDelete,
    handleCancelDelete,
    isDeleteModalOpen,
  } = useDiaryModal({ mode, selectedDate, selectedDiary, deleteDiary, onSave, onClose });

  return (
    <>
      <BaseModal isOpen={isOpen} onClose={onClose}>
        <div css={styles.modalContainer}>
          {/* 헤더 */}
          <DiaryModalHeader date={diary.date} />

          {/* 입력 필드들 */}
          <DiaryModalFields
            disabled={mode === 'view'}
            handleImage={handleImage}
            preview={preview}
            handleTitle={handleTitle}
            diary={diary}
            errors={errors}
            handleEmotion={handleEmotion}
            handleNotes={handleNotes}
          />

          {/* 버튼 */}
          <DiaryModalActions
            isLoading={isLoading}
            handleCancel={handleCancel}
            handleSave={handleSave}
            handleEdit={onModalChange}
            handleDelete={handleDelete}
            mode={mode}
          />
        </div>
      </BaseModal>
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default DiaryModal;
