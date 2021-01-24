import { FC } from 'react';

interface IButtonProps {
  handleAction: () => void;
  className?: string;
}

const BaseButton: FC<IButtonProps> = ({
  children,
  handleAction,
  className,
}) => {
  return (
    <button
      onClick={() => handleAction()}
      className={`button button--action flex items-center justify-center space-x-2 w-32 ${className}`}
    >
      {children}
    </button>
  );
};

export default BaseButton;
