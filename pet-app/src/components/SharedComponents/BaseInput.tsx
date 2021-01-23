import { FC } from 'react';

const BaseInput: FC = () => {
  return (
    <input
      type='text'
      placeholder='Search...'
      className='w-72 py-2 px-4 rounded-lg border-transparent focus:outline-none'
    />
  );
};

export default BaseInput;
