import { useQuery } from 'react-query';
import axios from 'axios';
import { IOwner } from 'helpers/types';

export function useOwner() {
  return useQuery(
    'owners',
    (): Promise<IOwner[]> =>
      axios
        .get('/owners')
        .then((res) => res.data)
        .catch((err) => err.res)
  );
}
