import * as yup from 'yup';

export const contactSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .max(30, 'Max length must be less than 30 chars'),
  number: yup
    .string()
    .required('Phone is required')
    .min(10, 'Min length must be more than 6 chars')
    .max(18, 'Max length must be less than 18 chars'),
});
