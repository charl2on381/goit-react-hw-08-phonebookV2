import { createSlice } from '@reduxjs/toolkit';
import { userLogin, userLogout, userRefresh, userRegister } from './operations';

const initialState = {
  user: {
    name: '',
    email: '',
  },
  token: null,
  isLoggedIn: false,
  isLoading: false,
  error: false,
  isRefresh: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  selectors: {
    selectIsRefresh: state => state.isRefresh,
    selectIsLoggedIn: state => state.isLoggedIn,
    selectIsLoading: state => state.isLoading,
    selectUser: state => state.user,
    selectIsError: state => state.error,
  },
  reducers: {
    clearError: state => {
      state.error = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(userRegister.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
      })
      .addCase(userRegister.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(userRegister.pending, (state, { payload }) => {
        state.error = false;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(userLogin.pending, (state, { payload }) => {
        state.error = false;
      })
      .addCase(userLogout.fulfilled, (state, { payload }) => {
        return initialState;
      })
      .addCase(userRefresh.fulfilled, (state, { payload }) => {
        state.user.name = payload.name;
        state.user.email = payload.email;
        state.isLoggedIn = true;
        state.isRefresh = false;
      })
      .addCase(userRefresh.pending, state => {
        state.isRefresh = true;
      })
      .addCase(userRefresh.rejected, state => {
        state.isRefresh = false;
      });
  },
});

export const authReducer = authSlice.reducer;
export const { clearError } = authSlice.actions;
export const {
  selectIsLoading,
  selectIsLoggedIn,
  selectUser,
  selectIsError,
  selectIsRefresh,
} = authSlice.selectors;
