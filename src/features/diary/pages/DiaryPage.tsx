import { css } from '@emotion/react';
import DiaryCalendar from '../components/DiaryCalendar';

const DiaryPage = () => {
  const DiaryPageCss = css`
    margin: 20px 0;
  `;
  return (
    <div css={DiaryPageCss}>
      <DiaryCalendar />
    </div>
  );
};

export default DiaryPage;
