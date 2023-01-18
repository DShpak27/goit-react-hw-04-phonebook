import { useState } from 'react';
import propTypes from 'prop-types';
import { nanoid } from 'nanoid';
import styles from './PhonebookEditor.module.scss';

function PhonebookEditor({ onSubmit }) {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const nameInputId = nanoid();
    const telInputId = nanoid();

    const handleInputChange = evt => {
        switch (evt.currentTarget.name) {
            case 'name':
                setName(evt.currentTarget.value);
                break;
            case 'number':
                setNumber(evt.currentTarget.value);
                break;
            default:
                return;
        }
    };

    const handleSubmit = evt => {
        evt.preventDefault();
        const id = nanoid();
        onSubmit({ name, number, id });
        formReset();
    };

    const formReset = () => {
        setName('');
        setNumber('');
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <label htmlFor={nameInputId} className={styles.label}>
                Name
            </label>

            <input
                id={nameInputId}
                className={styles.input}
                type="text"
                name="name"
                value={name}
                onChange={handleInputChange}
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
            />
            <label htmlFor={nameInputId} className={styles.label}>
                Number
            </label>
            <input
                id={telInputId}
                className={styles.input}
                type="tel"
                name="number"
                value={number}
                onChange={handleInputChange}
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
            />

            <button type="submit" className={styles.btn}>
                Add contact
            </button>
        </form>
    );
}

PhonebookEditor.propTypes = {
    onSubmit: propTypes.func.isRequired,
};

export default PhonebookEditor;
