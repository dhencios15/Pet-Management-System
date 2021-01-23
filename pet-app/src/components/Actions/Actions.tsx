import { BaseButton, BaseInput } from 'components/SharedComponents';
import { PlusCircle } from 'phosphor-react';

const Actions = () => {
  return (
    <div className='flex md:flex-row flex-col p-4 items-center md:space-x-4'>
      <div className='flex items-center space-x-4 mb-2'>
        <BaseButton handleAction={() => console.log('HELLO')}>
          <PlusCircle size={26} />
          <span>owner</span>
        </BaseButton>
        <BaseButton handleAction={() => console.log('HELLO')}>
          <PlusCircle size={26} />
          <span>pet</span>
        </BaseButton>
      </div>
      <div className='flex-1 mb-2'>
        <BaseInput />
      </div>
    </div>
  );
};

export default Actions;
