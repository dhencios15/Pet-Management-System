import { displayPetPicture } from 'helpers/formatDisplay';
import { IOwner, IPet } from 'helpers/types';

interface IOwnerPetList {
  owner: IOwner;
  onSelectPet: (pet: IPet) => void;
}

const OwnerPetList = ({ owner, onSelectPet }: IOwnerPetList) => {
  return (
    <div className='h-full grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-2 w-full'>
      {owner &&
        owner.OwnerPets.map((pet, i) => (
          <div
            key={i}
            data-tip={pet.PetBreed}
            className='p-1 rounded-full flex-shrink-0 w-16 h-16 mb-2'
            onClick={() => onSelectPet(pet)}
          >
            <div className='transform block bg-white p-1 rounded-full w-full h-full hover:-rotate-6 cursor-pointer'>
              <img
                className='object-cover object-center rounded-full w-full h-full'
                src={`${displayPetPicture(pet.PetType, pet.PetID)}`}
                alt='dog'
              />
            </div>
            <p className='text-xs text-center mt-1 hidden md:block'>
              {pet.PetName}
            </p>
          </div>
        ))}
    </div>
  );
};

export default OwnerPetList;
