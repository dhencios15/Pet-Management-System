import * as React from 'react';
import ReactTooltip from 'react-tooltip';
import Modal from 'react-modal';

import { selectBreedByType } from 'helpers/formatDisplay';
import { IOwner, IPet } from 'helpers/types';
import { useModal } from 'hooks/useModal';

import 'assets/styles.css';
import { OwnerForm, PetForm } from 'components/FormComponents';
import { OwnerPetList } from '.';

Modal.setAppElement('#root');

interface IOwnerCard {
  owner: IOwner;
}

const OwnerCard = ({ owner }: IOwnerCard) => {
  const { closeModal, modalIsOpen, openModal } = useModal();
  const [selectedPet, setSelectedPed] = React.useState<IPet | null>(null);
  const [selectedOwner, setSelectedOwner] = React.useState<IOwner | null>(null);
  const [petBdate, selectPetBdate] = React.useState<Date>(new Date());
  const [petBreeds, setPetBreeds] = React.useState<string[]>([]);
  const [petEdit, setPetEdit] = React.useState(false);
  const [selectedModal, setSelectedModal] = React.useState('');
  const [ownerEdit, setOwnerEdit] = React.useState(false);

  const onSelectPet = (pet: IPet) => {
    setSelectedModal('pet');
    setPetEdit(true);
    let breeds = selectBreedByType(pet.PetType);
    openModal();
    setSelectedPed({ ...pet, PetOwnerID: { ...owner } });
    selectPetBdate(pet.PetBdate);
    setPetBreeds(breeds);
  };

  const onSelectOwner = (owner: IOwner) => {
    setSelectedModal('owner');
    setOwnerEdit(true);
    setSelectedOwner(owner);
    openModal();
  };

  const onSelectType = React.useCallback((type) => {
    let breeds = selectBreedByType(type);
    setPetBreeds(breeds);
  }, []);

  const FormModal = () => {
    if (selectedModal === 'owner') {
      return (
        <OwnerForm
          selectedOwner={selectedOwner}
          closeModal={closeModal}
          isEditting={ownerEdit}
        />
      );
    } else if (selectedModal === 'pet') {
      return (
        <PetForm
          petBreeds={petBreeds}
          selectedPet={selectedPet}
          closeModal={closeModal}
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
      className={`transition duration-200 border border-navy-lighter shadow-xl  rounded-lg p-2 flex space-x-4 ${
        owner.IsActive === 'No' ? 'opacity-30' : 'bg-navy-light'
      }`}
    >
      <div className='bg-gradient-to-tr from-yellow-400 to-fucshia-600 p-1 rounded-xl flex-shrink-0 w-32 h-32'>
        <div className='transform block bg-white p-1 rounded-xl w-full h-full hover:-rotate-6 cursor-pointer'>
          <img
            onClick={() => onSelectOwner(owner)}
            className='object-cover object-center rounded-xl w-full h-full'
            src={`https://i.pravatar.cc/150?u=${owner.OwnerId}`}
            alt='dog'
          />
        </div>
      </div>
      <div className='text-white flex-1 flex flex-col'>
        <div className='flex justify-between items-center mb-1'>
          <h1 className='font-bold text-lg tracking-wider w-full'>
            {owner.OwnerName}
          </h1>
        </div>
        <p className='font-semibold text-sm text-gray-400 mb-1'>
          {owner.OwnerId} | {owner.OwnerEmail} | {owner.OwnerMobileNo}
        </p>
        <p className='font-semibold text-sm text-gray-400 mb-1'>
          {owner.OwnerAddress}, {owner.OwnerCity} - {owner.OwnerZip}
        </p>
        <div className='mt-4 border-t border-navy-lighter py-4'>
          <ReactTooltip />
          <OwnerPetList onSelectPet={onSelectPet} owner={owner} />
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
      </div>
    </div>
  );
};

export default OwnerCard;
