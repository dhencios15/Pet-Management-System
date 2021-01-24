import { useQuery } from 'react-query';
import axios from 'axios';
import { IPet } from 'helpers/types';

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

export async function createPet(data: any): Promise<IPet | Error> {
  try {
    const response = await axios.post('/pets', data);
    return response.data;
  } catch (error) {
    return error.response.data.PetName;
  }
}
