import { useState } from 'react';
import { DiaryData } from '../types/types';

export const useDiaryState = () => {
  const [diaries, setDiaries] = useState<DiaryData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [mode, setMode] = useState<'create' | 'edit'>('create');
  const [selectedDiary, setSelectedDiary] = useState<DiaryData | undefined>(undefined);

  // 특정 날짜의 일기를 찾는 함수
  const getDiaryByDate = (year: number, month: number, date: number) => {
    const targetDate = `${year}년 ${String(month + 1).padStart(2, '0')}월 ${String(date).padStart(2, '0')}일`;

    return diaries.find((d) => d.date === targetDate);
  };

  // 새 일기 작성 모달 열기
  const openCreateModal = (year: number, month: number, date: number) => {
    const selected = new Date(year, month, date);
    setSelectedDate(selected);
    setMode('create');
    setSelectedDiary(undefined);
    setIsModalOpen(true);
  };

  // 기존 일기 수정 모달 열기
  const openEditModal = (diary: DiaryData) => {
    setMode('edit');
    setSelectedDiary(diary);
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDiary(undefined);
    setSelectedDate(null);
  };

  // 일기 저장 ( 작성 or 수정 )
  const saveDiary = (updatedDiary: DiaryData, image: File | null) => {
    setDiaries((prev) => {
      const existingIndex = prev.findIndex((d) => d.id === updatedDiary.id);
      if (existingIndex !== -1) {
        //수정
        const newDiaries = [...prev];
        newDiaries[existingIndex] = updatedDiary;
        return newDiaries;
      } else {
        return [...prev, updatedDiary];
      }
    });

    closeModal();
  };

  return {
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
  };
};
