import * as yup from 'yup';
import { formatDate } from './formatDisplay';

const today = new Date();
function parseDateString(value: string, originalValue: Date) {
  const parsedDate = formatDate(originalValue);
  return parsedDate;
}

export const petSchema = yup.object().shape({
  PetOwnerID: yup.number().required('Please select owner'),
  PetName: yup.string().required('Please provide pet name'),
  PetType: yup.string().required('Please provide pet type'),
  PetBreed: yup.string().required('Please provide pet breed'),
  PetBdate: yup.date().default(today),
  PetGender: yup.string().required('Please provide pet gender'),
  PetNotes: yup.string().required('Please provide pet notes'),
});
