import { createSelector } from '@reduxjs/toolkit';
import { selectContacts } from './contactSlice';
import { selectFilter } from './filterSlice';

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    const filterLowCase = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterLowCase)
    );
  }
);
