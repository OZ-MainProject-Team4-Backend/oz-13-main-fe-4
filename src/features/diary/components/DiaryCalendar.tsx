import { css } from '@emotion/react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { DAYS, MONTHS } from '../../../constants/calenderConst';
import { useState } from 'react';
import DiaryModal from './DiaryModal';

const containerStyle = css`
  margin: 0 auto;
  min-width: 700px;
  max-width: 1200px;
  min-height: 700px;
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
  position: relative;
  text-align: left;
  padding: 10px 0 0 10px;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  min-height: 100px;
  cursor: pointer;
`;

const currentMonthDateStyle = css`
  ${dateStyle}
  background-color: white;
`;

const otherMonthDateStyle = css`
  ${dateStyle}
  color: #bbb;
  background-color: #fafafa;
`;

const todayCircleStyle = css`
  position: absolute;
  top: 8px;
  left: 8px;
  color: white;
  background-color: #1976d2;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  text-align: center;
  font-weight: 700;
  padding: 2px;
`;

const addDiaryButtonStyle = css`
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--color-background);
  color: #10498a;
  border: none;
  border-radius: 16px;
  padding: 6px 5px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  text-align: center;
  width: 80%;

  &:hover {
    background-color: #1976d2;
    color: white;
  }
`;

const DiaryCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 이번 달 총 일수
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // 이번 달 1일이 무슨 요일인지
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  // 지난 달 마지막 날
  const prevMonthLastDate = new Date(year, month, 0).getDate();

  // 이전 달 날짜들 ( 회색으로 표시할 날짜들 )
  const prevMonthDays = Array.from({ length: firstDayOfMonth }, (_, i) => ({
    date: prevMonthLastDate - firstDayOfMonth + i + 1,
    isCurrentMonth: false,
  }));

  // 이번 달 날짜들
  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => ({
    date: i + 1,
    isCurrentMonth: true,
  }));

  // 다음 달 날짜들 (총 42칸을 채우기 위함)
  const totalCells = 42;
  const remainingCells = totalCells - (prevMonthDays.length + currentMonthDays.length);
  const nextMonthDays = Array.from({ length: remainingCells }, (_, i) => ({
    date: i + 1,
    isCurrentMonth: false,
  }));

  const calendarDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];

  const goToPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const isToday = (date: number, isCurrentMonth: boolean) => {
    return isCurrentMonth && year === todayYear && month === todayMonth && date === todayDate;
  };

  const handleAddDiary = (date: number) => {
    const selected = new Date(year, month, date);
    setSelectedDate(selected);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
  };

  return (
    <>
      <div css={containerStyle}>
        {/* 캘린더 헤더 */}
        <div css={headerStyle}>
          <button type='button' css={navButtonStyle} onClick={goToPrevMonth}>
            <IoChevronBack />
          </button>
          <h2 css={titleStyle}>
            {year}년 {MONTHS[month]}
          </h2>
          <button type='button' css={navButtonStyle} onClick={goToNextMonth}>
            <IoChevronForward />
          </button>
        </div>

        {/* 요일 (mon - sun)*/}
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
            <div key={index} css={day.isCurrentMonth ? currentMonthDateStyle : otherMonthDateStyle}>
              {isToday(day.date, day.isCurrentMonth) ? (
                <>
                  <div css={todayCircleStyle}>
                    <span>{day.date}</span>
                  </div>
                  <button
                    type='button'
                    css={addDiaryButtonStyle}
                    onClick={() => handleAddDiary(day.date)}
                  >
                    + 일기 작성
                  </button>
                </>
              ) : (
                day.date
              )}
            </div>
          ))}
        </div>
      </div>
      <DiaryModal isOpen={isModalOpen} onClose={handleCloseModal} selectedDate={selectedDate} />
    </>
  );
};

export default DiaryCalendar;
