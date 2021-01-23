import { BaseButton, BaseInput } from 'components/SharedComponents';
import { PlusCircle } from 'phosphor-react';
import { NavLink } from 'react-router-dom';

const Actions = () => {
  return (
    <div className='flex md:flex-row justify-between flex-col p-4 items-center md:space-x-4'>
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
      <div className='mb-2'>
        <BaseInput />
      </div>
      <div className='bg-navy-light rounded-lg py-2 px-4 flex justify-between items-center space-x-4 mb-2'>
        <NavLink
          exact
          activeClassName='bg-navy-lighter'
          className='transition duration-300 button button-action w-32 text-center text-xs'
          to='/'
        >
          PETS VIEW
        </NavLink>
        <NavLink
          exact
          activeClassName='bg-navy-lighter'
          className='transition duration-300 button button-action w-32 text-center text-xs'
          to='/owner'
        >
          OWNERS VIEW
        </NavLink>
      </div>
    </div>
  );
};

export default Actions;
