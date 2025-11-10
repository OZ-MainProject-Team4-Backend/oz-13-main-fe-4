import { Mode } from 'react-hook-form';

export interface DiaryCalendarProps {
  startingDate: Date;
}

export interface DiaryData {
  id: number;
  date: string;
  title: string;
  emotion: number;
  notes: string;
  weather: {
    condition: string;
    temperature: number;
    icon: number;
  };
  image_url: string | null;
}

export interface DiaryModalProps {
  isOpen: boolean;
  selectedDate: Date | null;
  selectedDiary: DiaryData | undefined;
  mode: Modal;
  onClose: () => void;
  onSave?: (diary: DiaryData, image: File | null) => void;
  onModalChange: () => void;
}

export interface UseDiaryModalProps {
  mode: Modal;
  selectedDate: Date | null;
  selectedDiary: DiaryData | undefined;
  onSave?: (diary: DiaryData, image: File | null) => void;
  onClose: () => void;
}

export interface DiaryModalFieldsProps {
  preview: string | null;
  diary: DiaryData;
  errors?: DiaryError;
  handleImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEmotion: (index: number) => void;
  handleNotes: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export interface DiaryError {
  title?: string;
  notes?: string;
}

export type Modal = 'create' | 'edit' | 'view';
