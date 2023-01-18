import React from 'react';
import propTypes from 'prop-types';
import styles from './ContactsList.module.scss';

function ContactsList({ contacts, onContactDelete }) {
    return (
        <ul className={styles.list}>
            {contacts.map(({ name, number, id }) => (
                <li className={styles.item} key={id}>
                    {name}: {number}
                    <button
                        className={styles.button}
                        type="button"
                        onClick={() => {
                            onContactDelete(id);
                        }}
                    >
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    );
}

ContactsList.propTypes = {
    contacts: propTypes.arrayOf(propTypes.object.isRequired),
    onContactDelete: propTypes.func.isRequired,
};

export default ContactsList;
