import axios from 'axios';
import { BaseButton } from 'components/SharedComponents';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import Swal from 'sweetalert2';

interface IDeleteForm {
  id?: number;
  type: string;
  status?: string;
  closeModal: () => void;
}

interface IPetStatus {
  IsActive: string;
}

const DeleteForm = ({ id = 0, type, closeModal, status }: IDeleteForm) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, errors } = useForm<IPetStatus>({
    mode: 'onBlur',
    defaultValues: {
      IsActive: status,
    },
  });

  const mutationPet = useMutation((data: string) =>
    axios.put(`/pets/${id}`, data)
  );
  const mutationOwner = useMutation((data: string) =>
    axios.put(`/owners/${id}`, data)
  );

  const onSubmit = (data: any) => {
    if (type === 'PET') {
      mutationPet.mutate(data);
    } else if (type === 'OWNER') {
      mutationOwner.mutate(data);
    }
  };

  React.useEffect(() => {
    if (mutationPet.isSuccess) {
      queryClient.invalidateQueries('pets');
      closeModal();
      Swal.fire({
        title: 'Update Success',
        text: 'Pet Status Update Successfully',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    }
  }, [mutationPet.isSuccess, queryClient, closeModal]);

  React.useEffect(() => {
    if (mutationOwner.isSuccess) {
      queryClient.invalidateQueries('owners');
      closeModal();
      Swal.fire({
        title: 'Update Success',
        text: 'Owner Status Update Successfully',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    }
  }, [mutationOwner.isSuccess, queryClient, closeModal]);

  return (
    <>
      <h1 className='text-center text-white font-bold tracking-widest text-xl mb-2'>
        {type.toUpperCase()} DETAILS {id && `ID: ${id}`}
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex items-center justify-center space-x-4 text-white mx-auto'
      >
        <h3 className='font-semibold'>{`${type} STATUS`}</h3>
        <label htmlFor='yes'>YES</label>
        <input
          id='yes'
          name='IsActive'
          type='radio'
          value='Yes'
          ref={register}
        />
        <label htmlFor='no'>NO</label>
        <input id='no' name='IsActive' type='radio' value='No' ref={register} />
        {errors?.IsActive && (
          <p className='text-xs text-hot-pink'>{errors.IsActive.message}</p>
        )}
      </form>
      <div className='flex justify-center my-4 space-x-4'>
        <BaseButton handleAction={handleSubmit(onSubmit)}>SAVE</BaseButton>
        <BaseButton handleAction={closeModal}>Close</BaseButton>
      </div>
    </>
  );
};

export default DeleteForm;
