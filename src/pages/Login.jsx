import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { userLogin } from '../redux/auth/operations';
import { loginSchema } from 'schemas/loginSchema';
import { clearError } from '../redux/auth/authSlice';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const dispatch = useDispatch();

  const [showPass, setShowPass] = useState(false);

  const submit = data => {
    dispatch(userLogin(data))
      .unwrap()
      .then()
      .catch(error => toast.error(error))
      .finally(() => dispatch(clearError()));
  };

  // ----- show Error, using useEffect --------
  // useEffect(() => {
  //   if (isError) {
  //     toast.error(isError, {
  //       onClose: () => dispatch(clearError()),
  //     });
  //   }
  // }, [isError, dispatch]);

  return (
    <div className="max-w-sm mx-auto">
      <h2 className="text-gray-600 text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit(submit)}>
        <div className="mb-4">
          <input
            {...register('email')}
            type="text"
            placeholder="Insert your email"
            className="appearance-none rounded-full nm-inset-gray-200 leading-5 px-8 py-4 flex-grow sm:w-full focus:nm-inset-gray-300 focus:outline-none"
          />
          <p className="px-2 pt-1 text-red-500 text-sm text-center">
            {errors.email?.message}
          </p>
        </div>
        <div className="mb-4 relative">
          <input
            {...register('password')}
            type={showPass ? 'text' : 'password'}
            placeholder="Insert your password"
            className="appearance-none rounded-full nm-inset-gray-200 leading-5 px-8 py-4 flex-grow sm:w-full focus:nm-inset-gray-300 focus:outline-none"
          />
          <p className="px-2 pt-1 text-red-500 text-sm text-center">
            {errors.password?.message}
          </p>
          <button type="button" onClick={() => setShowPass(prev => !prev)}>
            {showPass ? (
              <FaEye className="absolute right-6 top-4 scale-150" />
            ) : (
              <FaEyeSlash className="absolute right-6 top-4 scale-150" />
            )}
          </button>
        </div>

        <div className="flex justify-center sm:justify-center pt-1">
          <button
            type="submit"
            className="rounded-full nm-flat-gray-200 hover:nm-flat-gray-200-lg leading-5 px-8 py-4 text-gray-600 font-bold  transition duration-200 ease-in-out transform hover:scale-110"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
