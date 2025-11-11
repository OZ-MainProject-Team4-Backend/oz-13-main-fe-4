export interface DiaryCalendarProps {
  startingDate: Date;
}

export interface DiaryData {
  id: number;
  date: string;
  title: string;
  emotion: Emotion;
  notes: string;
  weather: {
    condition: string;
    temperature: number;
    icon: number;
  };
  image_url: string | null;
}

export interface DiaryDataReq {
  date: string;
  title: string;
  emotion: string;
  notes: string;
  lon: string;
  lat: string;
  image_url: File | null;
}

export interface DiaryModalProps {
  isOpen: boolean;
  selectedDate: Date | null;
  selectedDiary: DiaryData | undefined;
  mode: Modal;
  onClose: () => void;
  onSave?: (diary: DiaryData, image: File | null) => void;
  onModalChange: () => void;
  deleteDiary: (id: number) => void;
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

export type Emotion = 'happy' | 'sad' | 'angry' | 'excited';
