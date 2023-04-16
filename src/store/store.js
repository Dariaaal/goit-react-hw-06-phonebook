import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createAction, createReducer, nanoid } from '@reduxjs/toolkit';
import initialContacts from "../components/phonebook/contacts.json";

export const addContact = createAction("contacts/addContact");

export const deleteContact = createAction('contacts/deleteContact');

export const setFilter = createAction("filter/setFilter");

export const contactsReducer = createReducer(initialContacts, {
      [addContact]: (state, action) => [...state, action.payload],
     [deleteContact]: (state, action) => state.filter(contact=>contact.id !== action.payload)
});

export const filterReducer = createReducer("", {
    [setFilter]: (state, action) => (state = action.payload)
});

// const rootReducer = combineReducers({
//     contacts: contactsReducer,
//     filter: filterReducer,
// })

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: filterReducer,
  },
});
