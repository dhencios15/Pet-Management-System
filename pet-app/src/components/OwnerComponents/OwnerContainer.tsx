import Loader from 'react-loader-spinner';
import { useOwner } from 'hooks/useOwner';
import { OwnerCard } from '.';

const OwnerContainer = () => {
  const { data, isLoading } = useOwner();
  console.log(data);
  return isLoading ? (
    <div className='my-10 flex justify-center items-center'>
      <Loader type='Grid' color='#00BFFF' height={80} width={80} />
    </div>
  ) : (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      {data?.map((owner) => (
        <OwnerCard key={owner.OwnerId} />
      ))}
    </div>
  );
};

export default OwnerContainer;
