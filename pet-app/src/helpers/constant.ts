export const PET_TYPE = {
  Dog: 'Dog',
  Cat: 'Cat',
  Bird: 'Bird',
  Fish: 'Fish',
};
export const PET_DOG_BREED = [
  'Bulldog',
  'Poodle',
  'Beagle',
  'Labrador',
  'Husky',
  'Chihuahua',
  'Dachshund',
  'Chow Chow',
];
export const PET_CAT_BREED = [
  'Persian',
  'Bengal',
  'Siamese',
  'Ragdoll',
  'Scottish',
  'Savannah',
  'Siberian',
];
export const PET_BIRD_BREED = [
  'Parrots',
  'Cockatiel',
  'Finches',
  'Lovebirds',
  'Cockatoos',
];
export const PET_FISH_BREED = [
  'Goldfish',
  'Betta',
  'Angelfish',
  'Catfish',
  'Mollies',
  'Guppies',
];
export const PET_BREEDS = PET_DOG_BREED.concat(
  PET_FISH_BREED,
  PET_BIRD_BREED,
  PET_CAT_BREED
);

export const GENDER = ['Male', 'Female'];
