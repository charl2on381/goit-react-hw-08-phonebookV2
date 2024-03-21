import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterContact: (_, action) => {
      return action.payload;
    },
  },
  selectors: {
    selectFilter: state => state,
  },
});

export const { filterContact } = filterSlice.actions;
export const { selectFilter } = filterSlice.selectors;
export const filterReducer = filterSlice.reducer;
