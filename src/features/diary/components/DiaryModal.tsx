import BaseModal from '../../../components/Modal/BaseModal';

interface DiaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
}

const DiaryModal = ({ isOpen, onClose, selectedDate }: DiaryModalProps) => {
  const date = selectedDate
    ? `${selectedDate.getFullYear()}년 ${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일`
    : '';
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      {date}
    </BaseModal>
  );
};

export default DiaryModal;
