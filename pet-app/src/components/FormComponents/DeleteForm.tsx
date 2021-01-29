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

  console.log(type);

  const mutationPet = useMutation((data: string) =>
    axios.put(`/pets/${id}`, data)
  );
  const mutationOwner = useMutation((data: string) =>
    axios.put(`/owners/${id}`, data)
  );
  const murationDeletePet = useMutation(() => axios.delete(`/pets/${id}`));
  const murationDeleteOwner = useMutation(() => axios.delete(`/owners/${id}`));

  const onSubmit = (data: any) => {
    if (type === 'PET') {
      mutationPet.mutate(data);
    } else if (type === 'OWNER') {
      mutationOwner.mutate(data);
    }
  };

  const onDelete = () => {
    if (type === 'PET') {
      murationDeletePet.mutate();
    } else if (type === 'OWNER') {
      murationDeleteOwner.mutate();
    }
  };

  React.useEffect(() => {
    if (mutationPet.isSuccess) {
      queryClient.invalidateQueries('pets');
      closeModal();
      Swal.fire({
        title: 'Update Success',
        text: 'Pet record has been updated',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    }
    if (murationDeletePet.isSuccess) {
      queryClient.invalidateQueries('pets');
      closeModal();
      Swal.fire({
        title: 'Delete Success',
        text: 'Pet record has been deleted',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    }
  }, [
    mutationPet.isSuccess,
    murationDeletePet.isSuccess,
    queryClient,
    closeModal,
  ]);

  React.useEffect(() => {
    if (mutationOwner.isSuccess) {
      queryClient.invalidateQueries('owners');
      closeModal();
      Swal.fire({
        title: 'Update Success',
        text: 'Owner record has been updated',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    }
    if (murationDeleteOwner.isSuccess) {
      queryClient.invalidateQueries('owners');
      closeModal();
      Swal.fire({
        title: 'Delete Success',
        text: 'Owner record has been deleted',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    }
  }, [
    mutationOwner.isSuccess,
    murationDeleteOwner.isSuccess,
    queryClient,
    closeModal,
  ]);

  return (
    <>
      <h1 className='text-center text-white font-bold tracking-widest text-xl mb-2'>
        {type.toUpperCase()} DETAILS {id && `ID: ${id}`}
      </h1>
      {(murationDeletePet.isError || murationDeleteOwner.isError) && (
        <p className='text-center text-sm text-hot-pink'>
          {`${type} STILL HAVE A PET, CANNOT BE DELETE!`}
        </p>
      )}
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
        <BaseButton
          className='text-sm w-36'
          handleAction={handleSubmit(onSubmit)}
        >
          UPDATE STATUS
        </BaseButton>
      </div>
      <div className='flex justify-center my-4 space-x-4'>
        <BaseButton className='w-40 bg-hot-pink' handleAction={onDelete}>
          DELETE {type}
        </BaseButton>
        <BaseButton className='w-40' handleAction={closeModal}>
          Close
        </BaseButton>
      </div>
    </>
  );
};

export default DeleteForm;
