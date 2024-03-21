import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup.string().email('Email is not valid').required('Email is required'),
  password: yup
    .string()
    .required()
    .min(6, 'Min length must be more than 6 chars')
    .max(18, 'Max length must be less than 18 chars'),
});
