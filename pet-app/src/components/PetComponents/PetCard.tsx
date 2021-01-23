import {
  displayPetPicture,
  formatDate,
  formatOwnerName,
} from 'helpers/formatDisplay';
import { IoMdFemale, IoMdMale } from 'react-icons/io';
import { IPet } from 'services/types';

interface IPetCard {
  pet: IPet;
}

const PetCard = ({ pet }: IPetCard) => {
  return (
    <div
      className={`transition duration-200 transform hover:scale-105 border border-navy-lighter shadow-xl  rounded-lg p-2 flex space-x-4 ${
        pet.IsActive === 'No' ? 'opacity-30' : 'bg-navy-light'
      }`}
    >
      <div className='bg-gradient-to-tr from-yellow-400 to-fucshia-600 p-1 rounded-full flex-shrink-0 w-24 h-24'>
        <div className='transform block bg-white p-1 rounded-full w-full h-full hover:-rotate-6 cursor-pointer'>
          <img
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
        <p className='font-semibold text-xs text-gray-400'>
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
    </div>
  );
};

export default PetCard;
