import dayjs from 'dayjs';
import {
  PET_DOG_BREED,
  PET_TYPE,
  PET_CAT_BREED,
  PET_BIRD_BREED,
  PET_FISH_BREED,
} from './constant';

export const formatDate = (date: Date) => {
  if (date) return dayjs(date).format('MM-DD-YY');
  else return dayjs(new Date()).format('MM-DD-YY');
};

export const formatOriginalDate = (date: Date = new Date()) =>
  dayjs(date).toDate();

export const formatOwnerName = (name: string) => name.toLowerCase();
export const formatKittenId = (id: number) =>
  id <= 1 ? 301 : id === 2 ? 302 : 300 + (id - 1);
export const displayPetPicture = (type: string, id: number) =>
  type === 'Dog'
    ? `https://placedog.net/640/480?id=${id}`
    : type === 'Cat'
    ? `http://placekitten.com/${formatKittenId(id)}/200?random`
    : 'https://placeimg.com/300/200/animals';
export const selectBreedByType = (
  type: string | null | undefined
): string[] | [] => {
  let breed: string[] = [];
  switch (type) {
    case PET_TYPE.Dog:
      return (breed = PET_DOG_BREED);
    case PET_TYPE.Cat:
      return (breed = PET_CAT_BREED);
    case PET_TYPE.Bird:
      return (breed = PET_BIRD_BREED);
    case PET_TYPE.Fish:
      return (breed = PET_FISH_BREED);
    default:
      return breed;
  }
};
