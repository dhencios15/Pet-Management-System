import dayjs from 'dayjs';

export const formatDate = (date: Date) => dayjs(date).format('MM-DD-YY');
export const formatOwnerName = (name: string) => name.toLowerCase();
export const formatKittenId = (id: number) =>
  id <= 1 ? 301 : id === 2 ? 302 : 300 + (id - 1);
export const displayPetPicture = (type: string, id: number) =>
  type === 'Dog'
    ? `https://placedog.net/640/480?id=${id}`
    : type === 'Cat'
    ? `http://placekitten.com/${formatKittenId(id)}/200?random`
    : 'https://placeimg.com/300/200/animals';
