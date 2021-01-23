import { useQuery } from 'react-query';
import axios from 'axios';
import { IPet } from 'services/types';

export function usePets() {
  return useQuery(
    'pets',
    (): Promise<IPet[]> =>
      axios
        .get('/pets')
        .then((res) => res.data)
        .catch((err) => err.res)
  );
}
