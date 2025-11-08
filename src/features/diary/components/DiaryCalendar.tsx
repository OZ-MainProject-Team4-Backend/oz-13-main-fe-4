import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { DAYS, MONTHS } from '../../../constants/calenderConst';
import { useState } from 'react';
import DiaryModal from './DiaryModal';
import * as styles from './DiaryCalendar.styles';
import { DiaryData } from '../types/types';

const DiaryCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [diaries, setDiaries] = useState<DiaryData[]>([]);

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

  const handleSaveDiary = (newDiary: DiaryData, image: File | null) => {
    setDiaries((prev) => [...prev, newDiary]);
    handleCloseModal();
  };

  console.log('다이어리 기록용', diaries);

  return (
    <>
      <div css={styles.containerStyle}>
        {/* 캘린더 헤더 */}
        <div css={styles.headerStyle}>
          <button type='button' css={styles.navButtonStyle} onClick={goToPrevMonth}>
            <IoChevronBack />
          </button>
          <h2 css={styles.titleStyle}>
            {year}년 {MONTHS[month]}
          </h2>
          <button type='button' css={styles.navButtonStyle} onClick={goToNextMonth}>
            <IoChevronForward />
          </button>
        </div>

        {/* 요일 (mon - sun)*/}
        <div css={styles.daysHeaderStyle}>
          {DAYS.map((day) => (
            <div key={day} css={styles.dayLabelStyle}>
              {day}
            </div>
          ))}
        </div>

        {/* 캘린더 바디 */}
        <div css={styles.calendarBodyStyle}>
          {calendarDays.map((day, index) => (
            <div
              key={index}
              css={day.isCurrentMonth ? styles.currentMonthDateStyle : styles.otherMonthDateStyle}
            >
              {isToday(day.date, day.isCurrentMonth) ? (
                <>
                  <div css={styles.todayCircleStyle}>
                    <span>{day.date}</span>
                  </div>
                  <button
                    type='button'
                    css={styles.addDiaryButtonStyle}
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
      <DiaryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedDate={selectedDate}
        onSave={handleSaveDiary}
      />
    </>
  );
};

export default DiaryCalendar;
