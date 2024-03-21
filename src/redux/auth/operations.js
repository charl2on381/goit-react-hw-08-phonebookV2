import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, clearToken, setToken } from 'axiosConfig/api';

export const userRegister = createAsyncThunk(
  'users/registerUser',
  async (user, thunkAPI) => {
    try {
      const { data } = await api.post('/users/signup', user);
      setToken(data.token);
      return data;
    } catch (error) {
      if (error.response.data.code === 11000) {
        return thunkAPI.rejectWithValue('Sorry, this user exist');
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const userLogin = createAsyncThunk(
  'users/loginUser',
  async (user, thunkAPI) => {
    try {
      const { data } = await api.post('/users/login', user);
      setToken(data.token);
      return data;
    } catch (error) {
      if (error.request.status === 400) {
        return thunkAPI.rejectWithValue('Creditials is not valid');
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const userLogout = createAsyncThunk(
  '/users/logout',
  async (_, thunkApi) => {
    try {
      await api.post('users/logout');
      clearToken();
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const userRefresh = createAsyncThunk(
  '/users/refresh',
  async (_, thunkApi) => {
    const savedToken = thunkApi.getState().auth.token;
    if (!savedToken) {
      return thunkApi.rejectWithValue('Token is not exist');
    }
    try {
      setToken(savedToken);
      const { data } = await api.get('users/current');
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
