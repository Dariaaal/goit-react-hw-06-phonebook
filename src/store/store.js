import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createAction, createReducer } from '@reduxjs/toolkit';
import initialContacts from "../components/phonebook/contacts.json";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const addContact = createAction("contacts/addContact");

export const deleteContact = createAction("contacts/deleteContact");

export const setFilter = createAction("filter/setFilter");

export const contactsReducer = createReducer(initialContacts, {
      [addContact]: (state, action) => [...state, action.payload],
     [deleteContact]: (state, action) => state.filter(contact=>contact.id !== action.payload)
});

export const filterReducer = createReducer("", {
    [setFilter]: (state, action) => (state = action.payload)
});

const rootReducer = combineReducers({
    contacts: contactsReducer,
    filter: filterReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['filter'],
}

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
 
export const persistor = persistStore(store);
