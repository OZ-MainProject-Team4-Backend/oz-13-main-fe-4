import { css, SerializedStyles } from '@emotion/react';
import { useEffect } from 'react';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children?: React.ReactNode; // 내용 (input, content 등)
  footer?: React.ReactNode; // 버튼 영역

  titleCss?: SerializedStyles;
  subtitleCss?: SerializedStyles;
  footerCss?: SerializedStyles;
}

const overlayStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(4, 3, 3, 0.6);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 50px;
  z-index: 10;
`;

const modalStyle = css`
  background-color: #fff;
  min-width: 400px;
  min-height: 150px;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

const baseTitleStyle = css`
  font-size: 1.25rem;
  font-weight: 600;
`;

const baseSubtitleStyle = css`
  font-size: 0.9rem;
  color: #555;
`;

const baseFooterStyle = css`
  display: flex;
  justify-content: flex-end;
  gap: 5px;
`;

const BaseModal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  titleCss,
  subtitleCss,
  footerCss,
}: BaseModalProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div css={overlayStyle} onClick={onClose}>
      <div css={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div>
          <h3 css={[baseTitleStyle, titleCss]}>{title}</h3>
          {subtitle && <p css={[baseSubtitleStyle, subtitleCss]}>{subtitle}</p>}
        </div>
        {children}
        {footer && <div css={[baseFooterStyle, footerCss]}>{footer}</div>}
      </div>
    </div>
  );
};

export default BaseModal;
