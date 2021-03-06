import * as React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import Swal from 'sweetalert2';

import { IOwner } from 'helpers/types';
import { ownerSchema } from 'helpers/inputValidation';
import { BaseButton } from 'components/SharedComponents';
import 'react-datepicker/dist/react-datepicker.css';

interface IOwnerForm {
  selectedOwner?: IOwner | null;
  closeModal: () => void;
  isEditting: boolean;
}

const OwnerForm = ({ selectedOwner, closeModal, isEditting }: IOwnerForm) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, errors } = useForm<IOwner>({
    resolver: yupResolver(ownerSchema),
    mode: 'onBlur',
  });

  const mutation = useMutation((data) => axios.post('/owners', data));
  const mutationUpdate = useMutation((data: IOwner) =>
    axios.put(`/owners/${selectedOwner?.OwnerId}`, data)
  );

  const onSubmit = (data: any) => {
    isEditting ? mutationUpdate.mutate(data) : mutation.mutate(data);
  };

  React.useEffect(() => {
    if (mutationUpdate.isSuccess) {
      queryClient.invalidateQueries('owners');
      closeModal();
      Swal.fire({
        title: 'Update Success',
        text: 'Pet Owner Info has been updated',
        icon: 'success',
        confirmButtonText: 'Cool',
      });
    }
  }, [queryClient, closeModal, mutationUpdate.isSuccess]);

  React.useEffect(() => {
    if (mutation.isSuccess) {
      queryClient.invalidateQueries('owners');
      closeModal();
      Swal.fire({
        title: 'Add Success',
        text: 'New Owner Info has been added',
        icon: 'success',
        confirmButtonText: 'Cool',
      });
    }
  }, [mutation.isSuccess, queryClient, closeModal]);

  return (
    <>
      <h1 className='text-center text-white font-bold tracking-widest text-xl mb-2'>
        OWNER DETAILS {selectedOwner && `ID: ${selectedOwner?.OwnerId}`}
      </h1>
      {(mutation.isError || mutationUpdate.isError) && (
        <p className='text-center text-sm text-hot-pink'>
          Name is already taken
        </p>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col justify-center items-center space-y-2'
      >
        <div className='flex flex-col text-white mx-auto'>
          <label className='font-semibold'>NAME</label>
          <input
            type='text'
            className={`rounded-lg py-1 px-2 focus:outline-none mx-auto w-64 text-black ${
              mutation.isError || !!errors?.OwnerName || mutationUpdate.isError
                ? 'border-2 border-red-600'
                : ''
            }`}
            name='OwnerName'
            defaultValue={selectedOwner?.OwnerName || ''}
            ref={register}
          />
          {errors?.OwnerName?.message && (
            <p className='text-xs text-hot-pink'>
              {errors?.OwnerName?.message}
            </p>
          )}
        </div>
        <div className='flex flex-col text-white mx-auto'>
          <label className='font-semibold'>EMAIL</label>
          <input
            type='email'
            className={`rounded-lg py-1 px-2 focus:outline-none mx-auto w-64 text-black ${
              errors?.OwnerEmail && 'border-2 border-red-600'
            }`}
            name='OwnerEmail'
            defaultValue={selectedOwner?.OwnerEmail || ''}
            ref={register}
          />
          {errors?.OwnerEmail?.message && (
            <p className='text-xs text-hot-pink'>
              {errors?.OwnerEmail?.message}
            </p>
          )}
        </div>

        <div className='flex flex-col text-white mx-auto'>
          <label className='font-semibold'>MOBILE</label>
          <input
            type='text'
            className={`rounded-lg py-1 px-2 focus:outline-none mx-auto w-64 text-black ${
              errors?.OwnerMobileNo && 'border-2 border-red-600'
            } ${errors?.OwnerMobileNo && 'border-2 border-red-600'}`}
            name='OwnerMobileNo'
            defaultValue={selectedOwner?.OwnerMobileNo || ''}
            ref={register}
          />
          {errors?.OwnerMobileNo?.message && (
            <p className='text-xs text-hot-pink'>
              {errors?.OwnerMobileNo?.message}
            </p>
          )}
        </div>
        <div className='flex flex-col text-white mx-auto'>
          <label className='font-semibold'>ADDRESS</label>
          <input
            type='text'
            className={`rounded-lg py-1 px-2 focus:outline-none mx-auto w-64 text-black ${
              errors?.OwnerAddress && 'border-2 border-red-600'
            }`}
            name='OwnerAddress'
            defaultValue={selectedOwner?.OwnerAddress || ''}
            ref={register}
          />
          {errors?.OwnerAddress?.message && (
            <p className='text-xs text-hot-pink'>
              {errors?.OwnerAddress?.message}
            </p>
          )}
        </div>
        <div className='flex flex-col text-white mx-auto'>
          <label className='font-semibold'>CITY</label>
          <input
            type='text'
            className={`rounded-lg py-1 px-2 focus:outline-none mx-auto w-64 text-black ${
              errors?.OwnerCity && 'border-2 border-red-600'
            }`}
            name='OwnerCity'
            defaultValue={selectedOwner?.OwnerCity || ''}
            ref={register}
          />
          {errors?.OwnerCity?.message && (
            <p className='text-xs text-hot-pink'>
              {errors?.OwnerCity?.message}
            </p>
          )}
        </div>
        <div className='flex flex-col text-white mx-auto'>
          <label className='font-semibold'>ZIP</label>
          <input
            type='text'
            className={`rounded-lg py-1 px-2 focus:outline-none mx-auto w-64 text-black ${
              errors?.OwnerZip && 'border-2 border-red-600'
            }`}
            name='OwnerZip'
            defaultValue={selectedOwner?.OwnerZip || ''}
            ref={register}
          />
          {errors?.OwnerZip?.message && (
            <p className='text-xs text-hot-pink'>{errors?.OwnerZip?.message}</p>
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

export default React.memo(OwnerForm);
