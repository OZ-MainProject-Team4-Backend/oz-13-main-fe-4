export interface DiaryCalendarProps {
  startingDate: Date;
}

export interface DiaryData {
  id: number;
  date: string;
  title: string;
  satisfaction: string;
  notes: string;
  weather: {
    condition: string;
    temperature: number;
  };
  image_url: string | null;
}
