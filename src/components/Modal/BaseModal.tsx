import { css } from '../../../styled-system/css';

interface BaseModalProps {
  isOpen: boolean;
  title: string;
  subtitle?: string;
  children?: React.ReactNode; // 내용 (input, content등 )
  footer?: React.ReactNode; // 버튼 영역
}

const BaseModal = ({ isOpen, title, subtitle, children, footer }: BaseModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className={css({
        position: 'fixed',
        top: 0,
        left: 0,
        bg: 'rgba(0,0,0,0.6)',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        pt: '20',
        zIndex: 10,
      })}
    >
      <div
        className={css({
          bg: 'white',
          minW: '400px',
          minH: '150px',
          rounded: 'sm',
          p: 4,
        })}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {children}
        {footer && <div>{footer}</div>}
      </div>
    </div>
  );
};

export default BaseModal;
