// DiaryCalendar.tsx (디자인만)
import { css } from '@emotion/react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { DAYS } from '../../../constants/calenderConst';

const containerStyle = css`
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
  min-height: 90vh;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const headerStyle = css`
  padding: 25px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const navButtonStyle = css`
  background: transparent;
  border: none;
  font-size: 24px;
  color: #666;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    color: #333;
  }
`;

const titleStyle = css`
  font-size: 24px;
  font-weight: 600;
  color: #1f1e1e;
  margin: 0;
`;

const daysHeaderStyle = css`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border: 1px solid #ddd;
`;

const dayLabelStyle = css`
  color: #718096;
  text-align: center;
  padding: 8px 0;
  font-weight: 500;
`;

const calendarBodyStyle = css`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  flex: 1;
`;

const dateStyle = css`
  text-align: right;
  padding: 7px 8px 0 0;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  min-height: 100px;
`;

const emptyDateStyle = css`
  ${dateStyle}
  background-color: #f9f9f9;
`;

const DiaryCalendar = () => {
  // 정적인 더미 데이터 (UI 확인용)
  const calendarDays = [
    null,
    null,
    null,
    null,
    null,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
  ];

  return (
    <div css={containerStyle}>
      {/* 캘린더 헤더 */}
      <div css={headerStyle}>
        <button type='button' css={navButtonStyle}>
          <IoChevronBack />
        </button>
        <h2 css={titleStyle}>2025년 11월</h2>
        <button type='button' css={navButtonStyle}>
          <IoChevronForward />
        </button>
      </div>

      {/* 요일 헤더 */}
      <div css={daysHeaderStyle}>
        {DAYS.map((day) => (
          <div key={day} css={dayLabelStyle}>
            {day}
          </div>
        ))}
      </div>

      {/* 캘린더 바디 */}
      <div css={calendarBodyStyle}>
        {calendarDays.map((day, index) => (
          <div key={index} css={day ? dateStyle : emptyDateStyle}>
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiaryCalendar;
