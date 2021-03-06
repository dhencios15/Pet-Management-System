import * as React from 'react';
import Loader from 'react-loader-spinner';
import Fuse from 'fuse.js';

import { useOwner } from 'hooks/useOwner';
import { OwnerCard } from '.';

const OwnerContainer = () => {
  const { data, isLoading } = useOwner();
  const [query, setQuery] = React.useState('');

  const fuse = new Fuse(data || [], {
    keys: ['OwnerName'],
    includeScore: true,
  });

  const results = fuse.search(query);

  const owners = query
    ? results
        .filter(({ score, item }) => {
          let ownerScore: number = Number(score) * 100;
          if (ownerScore < 1) return item;
          return false;
        })
        .map((owner) => owner.item)
    : data;

  return isLoading ? (
    <div className='my-10 flex justify-center items-center'>
      <Loader type='Grid' color='#00BFFF' height={80} width={80} />
    </div>
  ) : (
    <div className='relative'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {owners?.map((owner) => (
          <OwnerCard key={owner.OwnerId} owner={owner} />
        ))}
      </div>
      <input
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Search...'
        className='transform -translate-y-16 -mt-5 absolute inset-x-0 top-0 mx-auto w-72 py-2 px-4 rounded-lg border-transparent focus:outline-none focus:ring focus:ring-navy-lighter'
      />
    </div>
  );
};

export default OwnerContainer;
