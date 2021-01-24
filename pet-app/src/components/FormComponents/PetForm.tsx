import * as React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { useMutation, useQueryClient } from 'react-query';

import { GENDER, PET_TYPE } from 'helpers/constant';
import { IPet } from 'helpers/types';
import { petSchema } from 'helpers/inputValidation';
import { BaseButton } from 'components/SharedComponents';
import 'react-datepicker/dist/react-datepicker.css';
import { formatOriginalDate } from 'helpers/formatDisplay';
import { useOwner } from 'hooks/useOwner';
import axios from 'axios';

interface IPetForm {
  selectedPet?: IPet | null;
  petBreeds: string[];
  petBdate?: Date;
  closeModal: () => void;
  onSelectType: (type: string) => void;
  isEditting: boolean;
}

const PetForm = ({
  selectedPet,
  petBreeds,
  closeModal,
  onSelectType,
  isEditting,
}: IPetForm) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, errors, setValue } = useForm<IPet>({
    resolver: yupResolver(petSchema),
    mode: 'onBlur',
  });
  const { data: petOwners } = useOwner();
  const mutation = useMutation((data) => axios.post('/pets', data));
  const mutationUpdate = useMutation((data: IPet) =>
    axios.put(`/pets/${selectedPet?.PetID}`, data)
  );

  const onSubmit = (data: any) => {
    isEditting ? mutationUpdate.mutate(data) : mutation.mutate(data);
  };

  React.useEffect(() => {
    if (mutation.isSuccess || mutationUpdate.isSuccess) {
      queryClient.invalidateQueries('pets');
      queryClient.invalidateQueries('owners');
      closeModal();
    }
  }, [mutation.isSuccess, queryClient, closeModal, mutationUpdate.isSuccess]);

  return (
    <>
      <h1 className='text-center text-white font-bold tracking-widest text-xl mb-2'>
        PET DETAILS {selectedPet && `ID: ${selectedPet?.PetID}`}
      </h1>
      {mutation.isError ||
        (mutationUpdate.isError && (
          <p className='text-center text-sm text-hot-pink'>
            Pet name is already taken
          </p>
        ))}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col justify-center items-center space-y-2'
      >
        <div className='flex flex-col text-white mx-auto'>
          <label className='font-semibold'>OWNER</label>
          <select
            className='rounded-lg py-1 px-2 focus:outline-none mx-auto w-64 text-black'
            name='PetOwnerID'
            defaultValue={selectedPet?.PetOwnerID.OwnerId}
            ref={register}
          >
            {!!selectedPet?.PetOwnerID.OwnerId ? (
              <option
                key={selectedPet?.PetOwnerID.OwnerId}
                value={selectedPet?.PetOwnerID.OwnerId}
              >
                {selectedPet?.PetOwnerID.OwnerName}
              </option>
            ) : (
              petOwners &&
              petOwners.map((owner) => (
                <option key={owner.OwnerId} value={owner.OwnerId}>
                  {owner.OwnerName}
                </option>
              ))
            )}
          </select>
          {errors?.PetOwnerID && <p className='text-xs text-hot-pink'>hello</p>}
        </div>
        <div className='flex flex-col text-white mx-auto'>
          <label className='font-semibold'>PET NAME</label>
          <input
            type='text'
            className='rounded-lg py-1 px-2 focus:outline-none mx-auto w-64 text-black'
            name='PetName'
            defaultValue={selectedPet?.PetName || ''}
            ref={register}
          />
          {errors?.PetName?.message && (
            <p className='text-xs text-hot-pink'>{errors?.PetName?.message}</p>
          )}
        </div>
        <div className='flex flex-col text-white mx-auto'>
          <label className='font-semibold'>PET TYPE</label>
          <select
            className='rounded-lg py-1 px-2 focus:outline-none mx-auto w-64 text-black'
            name='PetType'
            defaultValue={selectedPet?.PetType || ''}
            onChange={(e) => onSelectType(e.target.value)}
            ref={register}
          >
            {Object.keys(PET_TYPE).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors?.PetType?.message && (
            <p className='text-xs text-hot-pink'>{errors?.PetType?.message}</p>
          )}
        </div>
        <div className='flex flex-col text-white mx-auto'>
          <label className='font-semibold'>PET BREED</label>
          <select
            className='rounded-lg py-1 px-2 focus:outline-none mx-auto w-64 text-black'
            name='PetBreed'
            defaultValue={selectedPet?.PetBreed || ''}
            ref={register}
          >
            {petBreeds.map((breeds) => (
              <option key={breeds} value={breeds}>
                {breeds}
              </option>
            ))}
          </select>
          {errors?.PetBreed?.message && (
            <p className='text-xs text-hot-pink'>{errors?.PetBreed?.message}</p>
          )}
        </div>
        <div className='flex flex-col text-white mx-auto'>
          <label className='font-semibold'>PET BIRTHDATE</label>
          <DatePicker
            selected={formatOriginalDate(selectedPet?.PetBdate) || ''}
            className='rounded-lg py-1 px-2 focus:outline-none mx-auto w-64 text-black'
            onChange={(date) => setValue('PetBdate', date)}
            maxDate={new Date()}
            showYearDropdown
            showMonthDropdown
          />
          {errors?.PetBdate?.message && (
            <p className='text-xs text-hot-pink'>{errors?.PetBdate?.message}</p>
          )}
        </div>
        <div className='flex flex-col text-white mx-auto'>
          <label className='font-semibold'>PET GENDER</label>
          <select
            className='rounded-lg py-1 px-2 focus:outline-none mx-auto w-64 text-black'
            name='PetGender'
            defaultValue={selectedPet?.PetGender || ''}
            ref={register}
          >
            {GENDER.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
          {errors?.PetGender?.message && (
            <p className='text-xs text-hot-pink'>
              {errors?.PetGender?.message}
            </p>
          )}
        </div>
        <div className='flex flex-col text-white mx-auto'>
          <label className='font-semibold'>PET NOTES</label>
          <textarea
            className='rounded-lg py-1 px-2 focus:outline-none mx-auto w-64 text-black'
            name='PetNotes'
            defaultValue={selectedPet?.PetNotes || ''}
            ref={register}
          />
          {errors?.PetNotes?.message && (
            <p className='text-xs text-hot-pink'>{errors?.PetNotes?.message}</p>
          )}
        </div>
      </form>
      <div className='flex justify-center my-4 space-x-4'>
        <BaseButton handleAction={handleSubmit(onSubmit)}>
          {mutation.isLoading || mutationUpdate.isLoading
            ? 'Saving...'
            : 'Save'}
        </BaseButton>
        <BaseButton handleAction={closeModal}>Close</BaseButton>
      </div>
    </>
  );
};

export default React.memo(PetForm);
