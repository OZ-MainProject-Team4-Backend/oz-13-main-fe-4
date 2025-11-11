import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import DiaryModal from './DiaryModal';
import * as styles from './DiaryCalendar.styles';
import { DiaryData, Modal } from '../types/types';
import { getCalendarDays, isToday } from '../utils/calendar';
import { useCalendarDate } from '../hooks/useCalendarDate';
import { DAYS, MONTHS } from '../constants/calender';
import { useState } from 'react';
import { useDiariesForCalendar } from '../hooks/useDiaryQueries';

const DiaryCalendar = () => {
  const { year, month, goToPrevMonth, goToNextMonth } = useCalendarDate();
  const calendarDays = getCalendarDays(year, month);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [mode, setMode] = useState<Modal>('create');
  const [selectedDiary, setSelectedDiary] = useState<DiaryData | undefined>(undefined);

  const { data: diaries = [] } = useDiariesForCalendar(year, month);

  // 특정 날짜의 일기를 찾는 함수
  const getDiaryByDate = (year: number, month: number, date: number) => {
    const padMonth = String(month + 1).padStart(2, '0');
    const padDate = String(date).padStart(2, '0');
    const targetDate = `${year}년 ${padMonth}월 ${padDate}일`;
    return diaries.find((d) => d.date === targetDate);
  };

  // 일기 작성
  const handleAddDiary = (date: number) => {
    const selected = new Date(year, month, date);
    setSelectedDate(selected);
    setMode('create');
    setSelectedDiary(undefined);
    setIsModalOpen(true);
  };

  // 기존 일기 보기
  const handleViewDiary = (diary: DiaryData) => {
    setSelectedDiary(diary);
    setMode('view');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDiary(undefined);
    setSelectedDate(null);
  };

  const handleSaveDiary = () => {
    handleCloseModal();
  };

  // view -> edit
  const handleModeChange = () => {
    setMode('edit');
  };

  const deleteDiary = (id: number) => {
    // deleteDiary구현할 예정
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
          {calendarDays.map((day, index) => {
            const existingDiary = day.isCurrentMonth ? getDiaryByDate(year, month, day.date) : null;

            return (
              <div
                key={index}
                css={day.isCurrentMonth ? styles.currentMonthDateStyle : styles.otherMonthDateStyle}
              >
                {day.isCurrentMonth ? (
                  <>
                    <div
                      css={
                        isToday(day.date, day.isCurrentMonth, year, month)
                          ? styles.todayCircleStyle
                          : undefined
                      }
                    >
                      <span>{day.date}</span>
                    </div>

                    {existingDiary ? (
                      // 일기가 있으면 제목 표시
                      <button
                        type='button'
                        css={styles.diaryTitleButtonStyle}
                        onClick={() => handleViewDiary(existingDiary)}
                      >
                        {existingDiary.title}
                      </button>
                    ) : (
                      // 일기가 없으면 작성 버튼
                      <button
                        type='button'
                        css={styles.addDiaryButtonStyle}
                        onClick={() => handleAddDiary(day.date)}
                      >
                        + 일기 작성
                      </button>
                    )}
                  </>
                ) : (
                  day.date
                )}
              </div>
            );
          })}
        </div>
      </div>
      <DiaryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedDate={selectedDate}
        onSave={handleSaveDiary}
        mode={mode}
        selectedDiary={selectedDiary}
        onModalChange={handleModeChange}
        deleteDiary={deleteDiary}
      />
    </>
  );
};

export default DiaryCalendar;
