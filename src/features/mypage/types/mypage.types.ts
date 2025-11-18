// features/mypage/types/mypage.types.ts

// 섹션별 Props 타입
export interface ProfileSectionProps {
  isEditMode: boolean;
  onEditModeChange: (mode: boolean) => void;
}

export interface EmailSectionProps {
  isEditMode: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PasswordSectionProps {
  // 독립적으로 동작하므로 props 불필요
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface FavoriteLocationSectionProps {
  // 추후 지역 데이터 타입 추가
}

// 모달 상태 관리 타입
export interface ModalState {
  isOpen: boolean;
  title: string;
  message: string;
}

// 검증 상태 타입
export interface ValidationState {
  isNicknameValidated: boolean;
  isEmailVerified: boolean;
  isEmailCodeChecked: boolean;
}
