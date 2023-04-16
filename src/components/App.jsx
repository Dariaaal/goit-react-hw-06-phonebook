import React, { useState, useEffect } from "react";
import CardForm from "./phonebook/CardForm";
import CardList from "./phonebook/CardList";
import Filter from "./phonebook/Filter";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact, addContact, setFilter } from "../store/store";

// const useLocalStorage = (key, defaultValue) => {
//   const [state, setState] = useState(() => {
//     return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue;  
//   })

//   return [state, setState]
// }

export default function App() {
    
    const dispatch = useDispatch();

    const contacts = useSelector(state => state.contacts);

    const filter = useSelector(state => state.filter);

    // const [contacts, setContacts] = useLocalStorage('contacts', initialContacts);
     
    // const [filter, setFilter] = useState('');
    
    // useEffect(() => {
    //   window.localStorage.setItem('contacts', JSON.stringify(contacts));
    // }, [contacts])

  const dublicateContact = data => {
    contacts.find(item => item.name === data.name);
 }

  const formSubmitHandler = data =>{

    if (!dublicateContact(data)) {
      const contact = {
        id: nanoid(),
        ...data
      }

      // setContacts([contact, ...contacts]);
      dispatch(addContact(contact));
    }

    return alert (`${data.name} is already in contacts` )
  }

  const deleteContact = id => {
    dispatch(deleteContact(id));
 }
 
  const changeFilter = e => {
    const filterValue = e.target.value
     dispatch(setFilter(filterValue));
   }

   const visibleContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(filter.toLowerCase()));

    return (
        <div
          style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 40,
            color: '#010101'
          }}
        >
        
        <h1>Phonebook</h1>
        <CardForm onSubmit={formSubmitHandler}/>
        <h2>Contacts</h2>
        <Filter filter={filter} onChangeFilter={changeFilter}/>
        <CardList contacts={visibleContacts} onDeleteContact={deleteContact}/>
        </div>
      );
}