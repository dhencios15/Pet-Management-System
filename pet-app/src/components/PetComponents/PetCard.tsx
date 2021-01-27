import * as React from 'react';
import Modal from 'react-modal';

import {
  displayPetPicture,
  formatDate,
  formatOwnerName,
  selectBreedByType,
} from 'helpers/formatDisplay';
import { IoMdFemale, IoMdMale, IoMdClose } from 'react-icons/io';
import { IPet } from 'helpers/types';
import { useModal } from 'hooks/useModal';
import { DeleteForm, PetForm } from 'components/FormComponents';

interface IPetCard {
  pet: IPet;
}

const PetCard = ({ pet }: IPetCard) => {
  const { closeModal, modalIsOpen, openModal } = useModal();
  const [selectedPet, setSelectedPed] = React.useState<IPet | null>(null);
  const [petBdate, selectPetBdate] = React.useState<Date>(new Date());
  const [petBreeds, setPetBreeds] = React.useState<string[]>([]);
  const [petEdit, setPetEdit] = React.useState(false);
  const [selectedModal, setSelectedModal] = React.useState('');

  const onSelectPet = (pet: IPet) => {
    setPetEdit(true);
    let breeds = selectBreedByType(pet.PetType);
    openModal();
    setSelectedPed(pet);
    selectPetBdate(pet.PetBdate);
    setPetBreeds(breeds);
  };

  const onSelectType = React.useCallback((type) => {
    let breeds = selectBreedByType(type);
    setPetBreeds(breeds);
  }, []);

  const onCloseModal = () => {
    closeModal();
    setPetEdit(false);
  };

  const FormModal = () => {
    if (selectedModal === 'delete') {
      return (
        <DeleteForm
          id={selectedPet?.PetID}
          type='PET'
          closeModal={onCloseModal}
          status={selectedPet?.IsActive}
        />
      );
    } else if (selectedModal === 'pet') {
      return (
        <PetForm
          petBreeds={petBreeds}
          selectedPet={selectedPet}
          closeModal={onCloseModal}
          petBdate={petBdate}
          onSelectType={onSelectType}
          isEditting={petEdit}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <div
      className={`relative transition group duration-200 transform hover:scale-105 border border-navy-lighter shadow-xl rounded-lg p-2 flex space-x-4 ${
        pet.IsActive === 'No' ? 'opacity-30' : 'bg-navy-light'
      }`}
    >
      <div className='bg-gradient-to-tr from-yellow-400 to-fucshia-600 p-1 rounded-full flex-shrink-0 w-24 h-24'>
        <div className='transform block bg-white p-1 rounded-full w-full h-full hover:-rotate-6 cursor-pointer'>
          <img
            onClick={() => {
              onSelectPet(pet);
              setSelectedModal('pet');
            }}
            className='object-cover object-center rounded-full w-full h-full'
            src={`${displayPetPicture(pet.PetType, pet.PetID)}`}
            alt='dog'
          />
        </div>
      </div>
      <div className='text-white flex-1 flex flex-col space-y-1'>
        <div className='flex justify-between items-center'>
          <h1 className='font-bold text-lg tracking-wider w-full'>
            {pet.PetName}
          </h1>
          {pet.PetGender === 'Female' ? (
            <IoMdFemale className='w-8 h-8 text-hot-pink' />
          ) : (
            <IoMdMale className='w-8 h-8 text-blue-500' />
          )}
        </div>
        <p className='font-semibold text-sm text-gray-400'>
          {pet.PetID} | {pet.PetType} | {pet.PetBreed} |{' '}
          {formatDate(pet.PetBdate)}
        </p>
        <p className='text-gray-400 text-sm mb-2 italic'>
          " {pet.PetNotes} Lorem ipsum, dolor sit amet consectetur adipisicing
          elit. "
        </p>
        <div className='pt-1 border-t border-navy-lighter h-full flex items-center flex-row-reverse'>
          <h3 className='text-sm font-semibold'>
            {formatOwnerName(pet.PetOwnerID.OwnerName)}
          </h3>
        </div>
      </div>
      <button
        onClick={() => {
          onSelectPet(pet);
          setSelectedModal('delete');
        }}
        className='hidden group-hover:block text-white bg-hot-pink p-1 rounded-full h-5 w-5 absolute right-0 top-0 -mt-3 transform translate-x-2'
      >
        <IoMdClose className='text-center text-xs' />
      </button>
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

export default PetCard;
