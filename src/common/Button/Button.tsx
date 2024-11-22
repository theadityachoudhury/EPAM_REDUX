import './Button.css';

export type ButtonProps = {
  title?: string;
  icon?: JSX.Element;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isIconOnly?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

const Button = ({ title, icon, onClick, type, isIconOnly = false }: ButtonProps) => {
  return (
    <button
      type={type || 'button'}
      className={`custom-button ${isIconOnly ? 'icon-button' : ''}`}
      onClick={onClick}
    >
      {icon && <span className="button-icon">{icon}</span>}
      {!isIconOnly && title && <span className="button-title">{title}</span>}
    </button>
  );
};

export default Button;
