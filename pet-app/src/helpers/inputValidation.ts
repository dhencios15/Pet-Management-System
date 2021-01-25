import * as yup from 'yup';
import 'yup-phone';
const today = new Date();

export const petSchema = yup.object().shape({
  PetOwnerID: yup.number().required('Please select owner'),
  PetName: yup
    .string()
    .matches(/^[a-zA-Z]+$/, 'Name contains letter only')
    .required('Please provide pet name'),
  PetType: yup.string().required('Please provide pet type'),
  PetBreed: yup.string().required('Please provide pet breed'),
  PetBdate: yup.date().default(today),
  PetGender: yup.string().required('Please provide pet gender'),
  PetNotes: yup.string().required('Please provide pet notes'),
});

export const ownerSchema = yup.object().shape({
  OwnerName: yup
    .string()
    .matches(/^[a-zA-Z]+$/, 'Name contains letter only')
    .required('Please provide name'),
  OwnerAddress: yup.string().required('Please provide address'),
  OwnerCity: yup.string().required('Please provide city'),
  OwnerZip: yup.string().required('Please provide zip'),
  OwnerMobileNo: yup
    .string()
    .phone('PH', true, `Please input PH mobile number`)
    .required('Please provide mobile number'),
  OwnerEmail: yup
    .string()
    .email('Please input invalid email')
    .required('Please provide email'),
});
