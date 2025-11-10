import { Button } from '@mui/material';
import * as styles from './DiaryModal.styles';

interface DiaryModalActionsProps {
  isLoading: boolean;
  handleCancel: () => void;
  handleSave: () => void;
  mode: string;
}

const DiaryModalActions = ({
  isLoading,
  handleCancel,
  handleSave,
  mode,
}: DiaryModalActionsProps) => {
  return (
    <div css={styles.buttonWrapper}>
      <Button variant='outlined' color='primary' disabled={isLoading} onClick={handleCancel}>
        취소
      </Button>
      <Button variant='contained' color='primary' onClick={handleSave} disabled={isLoading}>
        {mode === 'edit' ? '수정 완료' : '저장'}
      </Button>
    </div>
  );
};

export default DiaryModalActions;
