import React, { Component } from 'react';
import './App.css';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
// import initialContacts from './data/contacts.json';
import { v4 as uuidv4 } from 'uuid';
import Filter from './components/Filter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  contactId = uuidv4();

  formSubmitHandler = newContact => {
    const similarName = this.state.contacts
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
        id: this.contactId,
        ...newContact,
      };
      notifySuccess();

      this.setState(({ contacts }) => ({
        contacts: [...contacts, addContact],
      }));
    }
  };

  onDeleteContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  seachContactByName = contactName => {
    this.setState({ filter: contactName.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;

    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  componentDidMount() {
    console.log('App componentDidMount');

    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }

    console.log(parsedContacts);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('App componentDidUpdate');

    if (this.state.contacts !== prevState.contacts) {
      console.log('Update');
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    console.log('App render');

    const { filter } = this.state;

    const visibleContacts = this.getVisibleContacts();

    return (
      <div className="Container">
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />

        <Filter value={filter} onChange={this.seachContactByName} />

        <h2>Contacts</h2>
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.onDeleteContact}
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
}

export default App;
