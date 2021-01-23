import { FC } from 'react';

interface IButtonProps {
  handleAction: () => void;
}

const BaseButton: FC<IButtonProps> = ({ children, handleAction }) => {
  return (
    <button
      onClick={() => handleAction()}
      className='button button--action flex items-center justify-center space-x-2 w-32'
    >
      {children}
    </button>
  );
};

export default BaseButton;
