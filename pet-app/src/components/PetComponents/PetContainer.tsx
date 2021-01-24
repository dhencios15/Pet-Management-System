import { PetCard } from 'components/PetComponents';
import Loader from 'react-loader-spinner';
import { usePets } from 'hooks/usePets';

const PetContainer = () => {
  const { data, isLoading } = usePets();

  return isLoading ? (
    <div className='my-10 flex justify-center items-center'>
      <Loader type='Grid' color='#00BFFF' height={80} width={80} />
    </div>
  ) : (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      {data?.map((pet) => (
        <PetCard key={pet.PetID} pet={pet} />
      ))}
    </div>
  );
};

export default PetContainer;
