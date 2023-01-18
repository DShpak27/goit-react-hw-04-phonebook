import { useEffect, useState } from 'react';

import ContactsList from './ContactsList/ContactsList.jsx';
import PhonebookEditor from './PhonebookEditor/PhonebookEditor.jsx';
import Section from './Section/Section.jsx';
import Filter from './Filter/Filter.jsx';

function App() {
    const [contacts, setContacts] = useState(() => {
        return (
            JSON.parse(window.localStorage.getItem('contacts')) ?? [
                { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
                { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
                { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
                { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
            ]
        );
    });

    const [filter, setFilter] = useState(() => {
        return JSON.parse(window.localStorage.getItem('filter')) ?? '';
    });

    useEffect(() => {
        window.localStorage.setItem('contacts', JSON.stringify(contacts));
        window.localStorage.setItem('filter', JSON.stringify(filter));
    }, [contacts, filter]);

    const getSubmittedData = data => {
        if (
            contacts.find(
                contact =>
                    contact.name.toLowerCase() === data.name.toLowerCase()
            )
        ) {
            return alert(`${data.name} is already in contacts`);
        }

        setContacts(prevContacts => {
            return [...prevContacts, data];
        });
    };

    const handleFilter = data => {
        setFilter(data);
    };

    const filterContactstoShow = () => {
        if (!filter) {
            return contacts;
        }
        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase())
        );
    };

    const deleteContact = idx => {
        let updatedContacts = contacts.filter(({ id }) => {
            return idx !== id;
        });
        setContacts(updatedContacts);
    };

    return (
        <>
            <Section title="Phonebook">
                <PhonebookEditor onSubmit={getSubmittedData} />
            </Section>
            {contacts.length > 0 && (
                <Section title="Contacts">
                    <Filter onFilterChange={handleFilter} />
                    <ContactsList
                        contacts={filterContactstoShow()}
                        onContactDelete={deleteContact}
                    />
                </Section>
            )}
        </>
    );
}

export default App;
