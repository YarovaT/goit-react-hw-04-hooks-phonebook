import { useState } from 'react';
import './App.css';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
// import initialContacts from './data/contacts.json';
import { v4 as uuidv4 } from 'uuid';
import Filter from './components/Filter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useLocalStorage from './components/hooks/useLocalStorage';

export default function App() {
  // Объявление новой переменной состояния
  const [contacts, setContacts] = useLocalStorage('contacts', '');
  const [filter, setFilter] = useState('');

  const formSubmitHandler = newContact => {
    const similarName = contacts
      .map(contact => contact.name.toLowerCase())
      .includes(newContact.name.toLowerCase());

    const notifyWarn = () =>
      toast.warn(`${newContact.name} is already in phonebook !`);

    const notifySuccess = () =>
      toast.success(`${newContact.name} is added in phonebook !`);

    if (similarName) {
      notifyWarn();
    } else {
      const addContact = {
        id: uuidv4(),
        ...newContact,
      };
      notifySuccess();

      setContacts(contacts => [...contacts, addContact]);
    }
  };

  const onDeleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const seachContactByName = contactName => {
    setFilter(contactName.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  return (
    <div className="Container">
      <h1>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler} />

      <Filter value={filter} onChange={seachContactByName} />

      <h2>Contacts</h2>
      <ContactList
        contacts={getVisibleContacts()}
        onDeleteContact={onDeleteContact}
      />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
      />
    </div>
  );
}
