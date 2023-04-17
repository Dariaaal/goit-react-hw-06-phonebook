import React from "react";
import CardForm from "./phonebook/CardForm";
import CardList from "./phonebook/CardList";
import Filter from "./phonebook/Filter";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact, addContact, setFilter } from "../store/store";

export default function App() {
    
    const dispatch = useDispatch();

    const contacts = useSelector(state => state.contacts);

    const filter = useSelector(state => state.filter);

  const formSubmitHandler = data => {

    const contact = {
      id: nanoid(),
      ...data
    }

    const dublicateContact = contacts.find(item => item.name === contact.name)

    if (dublicateContact) {
      return alert (`${data.name} is already in contacts` )
    }

    dispatch(addContact(contact));
  }

  const onDeleteContact = id => {
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
        <CardList contacts={visibleContacts} onDeleteContact={onDeleteContact}/>
        </div>
      );
}