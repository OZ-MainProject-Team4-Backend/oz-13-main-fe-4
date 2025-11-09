import * as styles from './DiaryModal.styles';

interface DiaryModalHeaderProps {
  date: string;
}

const DiaryModalHeader = ({ date }: DiaryModalHeaderProps) => {
  return (
    <div css={styles.header}>
      <h3 css={styles.dateTitle}>{date}</h3>
    </div>
  );
};

export default DiaryModalHeader;
