import * as React from 'react';
import Fuse from 'fuse.js';
import Loader from 'react-loader-spinner';

import { PetCard } from 'components/PetComponents';
import { usePets } from 'hooks/usePets';

const PetContainer = () => {
  const { data, isLoading } = usePets();
  const [query, setQuery] = React.useState('');

  const fuse = new Fuse(data || [], {
    keys: ['PetName', 'PetType', 'PetBreed'],
    includeScore: true,
  });

  const results = fuse.search(query);
  const pets = query ? results.map((result) => result.item) : data;

  return isLoading ? (
    <div className='my-10 flex justify-center items-center'>
      <Loader type='Grid' color='#00BFFF' height={80} width={80} />
    </div>
  ) : (
    <div className='relative'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {pets?.map((pet) => (
          <PetCard key={pet.PetID} pet={pet} />
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

export default PetContainer;
