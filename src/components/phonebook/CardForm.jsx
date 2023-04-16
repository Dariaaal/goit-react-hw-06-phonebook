import React, { useState } from "react";
import { nanoid } from "nanoid";
import css from "./CardForm.module.css";

export default function CardForm({onSubmit}) {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const nameInputId = nanoid();
    const numberInputId = nanoid();

    const fields = {name, number};

    const handleInputChange = e => {
        const { name, value } = e.target;
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'number':
                setNumber(value);
                break;
            default:
                return;
        }     
    }

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(fields);
        reset();
    }

    const reset = () => {
        setName('');
        setNumber('');
    }

        return (
            <form onSubmit={handleSubmit}>
            <label htmlFor={nameInputId} className={css.label}>
              Name
              </label>
                <input
                  type="text"
                  id={nameInputId}
                  name="name"
                  value={name}
                  pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                  title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                  required
                  onChange={handleInputChange}
                />
            <label htmlFor={numberInputId} className={css.label}>
              Number
            </label>
                <input 
                  type="tel"
                  id={numberInputId} 
                  name="number"
                  value={number}
                  pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                  title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                  required 
                  onChange={handleInputChange}
                />
            <button type="submit" className={css.button}>Add contact</button>
          </form>
        );
}