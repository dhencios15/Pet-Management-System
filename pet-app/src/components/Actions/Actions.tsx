import * as React from 'react';
import { PlusCircle } from 'phosphor-react';
import { NavLink } from 'react-router-dom';
import Modal from 'react-modal';

import { useModal } from 'hooks/useModal';
import { PetForm, OwnerForm } from 'components/FormComponents';
import { BaseButton, BaseInput } from 'components/SharedComponents';
import { selectBreedByType } from 'helpers/formatDisplay';

const Actions = () => {
  const { closeModal, modalIsOpen, openModal } = useModal();
  const [petBreeds, setPetBreeds] = React.useState<string[]>([]);
  const [selectedModal, setSelectedModal] = React.useState('');
  const onSelectType = React.useCallback((type) => {
    let breeds = selectBreedByType(type);
    setPetBreeds(breeds);
  }, []);

  // const opemModal = ({})

  const FormModal = () => {
    console.log(selectedModal);
    if (selectedModal === 'owner') {
      return <OwnerForm closeModal={closeModal} isEditting={false} />;
    } else if (selectedModal === 'pet') {
      return (
        <PetForm
          petBreeds={petBreeds}
          closeModal={closeModal}
          onSelectType={onSelectType}
          isEditting={false}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <div className='flex lg:flex-row justify-between flex-col p-4 items-center md:space-x-4'>
      <div className='flex items-center space-x-4 mb-2'>
        <BaseButton
          handleAction={() => {
            openModal();
            onSelectType('Dog');
            setSelectedModal('owner');
          }}
        >
          <PlusCircle size={26} />
          <span>owner</span>
        </BaseButton>
        <BaseButton
          handleAction={() => {
            openModal();
            onSelectType('Dog');
            setSelectedModal('pet');
          }}
        >
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

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='PET MODAL'
        className='mymodal'
        overlayClassName='myoverlay'
        closeTimeoutMS={500}
      >
        {FormModal()}
      </Modal>
    </div>
  );
};

export default Actions;
