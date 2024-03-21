import * as yup from 'yup';

export const registerSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .max(30, 'Name must be less than 30 chars'),
  email: yup.string().email('Email is not valid').required('Email is required'),
  password: yup
    .string()
    .required()
    .min(6, 'Min length must be more than 6 chars')
    .max(18, 'Max length must be less than 18 chars'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Password is not match'),
});
