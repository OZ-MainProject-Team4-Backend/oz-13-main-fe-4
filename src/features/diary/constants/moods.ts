import HappyIcon from '../../../assets/happy.svg';
import SadIcon from '../../../assets/sad.svg';
import SurprisedIcon from '../../../assets/surprised.svg';
import AngryIcon from '../../../assets/bad.svg';

interface Mood {
  name: string;
  icon: string;
}

export const MOODS: Mood[] = [
  { name: 'happy', icon: HappyIcon },
  { name: 'sad', icon: SadIcon },
  { name: 'angry', icon: AngryIcon },
  { name: 'excited', icon: SurprisedIcon },
];
