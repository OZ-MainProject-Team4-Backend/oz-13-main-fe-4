import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import DiaryModal from './DiaryModal';
import * as styles from './DiaryCalendar.styles';
import { DiaryData } from '../types/types';
import { getCalendarDays, isToday } from '../utils/calendarUtils';
import { useCalendarDate } from '../hooks/useCalendarDate';
import { useDiaryState } from '../hooks/useDiaryState';
import { DAYS, MONTHS } from '../constants/calender';

const DiaryCalendar = () => {
  const { year, month, goToPrevMonth, goToNextMonth } = useCalendarDate();
  const {
    diaries,
    isModalOpen,
    selectedDate,
    mode,
    selectedDiary,
    getDiaryByDate,
    openCreateModal,
    openEditModal,
    closeModal,
    saveDiary,
  } = useDiaryState();
  const calendarDays = getCalendarDays(year, month);

  const handleAddDiary = (date: number) => {
    openCreateModal(year, month, date);
  };

  const handleEditDiary = (diary: DiaryData) => {
    openEditModal(diary);
  };

  const handleCloseModal = () => {
    closeModal();
  };

  const handleSaveDiary = (updatedDiary: DiaryData, image: File | null) => {
    saveDiary(updatedDiary, image);
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
                        onClick={() => handleEditDiary(existingDiary)}
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
      />
    </>
  );
};

export default DiaryCalendar;
