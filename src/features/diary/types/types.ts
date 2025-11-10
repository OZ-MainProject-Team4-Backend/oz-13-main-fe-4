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
  onClose: () => void;
  selectedDate: Date | null;
  onSave?: (diary: DiaryData, image: File | null) => void;
  mode: 'create' | 'edit';
  selectedDiary: DiaryData | undefined;
}

export interface UseDiaryModalProps {
  mode: 'create' | 'edit';
  selectedDate: Date | null;
  selectedDiary: DiaryData | undefined;
  onSave?: (diary: DiaryData, image: File | null) => void;
  onClose: () => void;
}

export interface DiaryModalFieldsProps {
  handleImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  preview: string | null;
  handleTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  diary: DiaryData;
  handleEmotion: (index: number) => void;
  handleNotes: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
