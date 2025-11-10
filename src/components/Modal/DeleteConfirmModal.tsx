import BaseModal from './BaseModal';
import { Button } from '@mui/material';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm }: DeleteConfirmModalProps) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title='일기를 정말 삭제하시겠습니까?'
      subtitle='삭제 후에는 복구할 수 없습니다.'
      footer={
        <>
          <Button onClick={onClose} variant='outlined' color='primary'>
            취소
          </Button>

          <Button onClick={onConfirm} variant='contained' color='primary'>
            삭제하기
          </Button>
        </>
      }
    />
  );
};

export default DeleteConfirmModal;
