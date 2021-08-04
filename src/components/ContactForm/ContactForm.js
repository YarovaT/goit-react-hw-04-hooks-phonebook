import React, { Component } from 'react';
import style from './ContactForm.module.css';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleInputOnChange = event => {
    const { name, value } = event.currentTarget;

    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state);

    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className={style.formGroup}>
          <label>
            Name{' '}
            <input
              type="text"
              name="name"
              value={name}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
              required
              onChange={this.handleInputOnChange}
            />
          </label>

          <label>
            Number{' '}
            <input
              type="tel"
              name="number"
              value={number}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
              required
              onChange={this.handleInputOnChange}
            />
          </label>
        </div>

        <Button type="submit" variant="contained" startIcon={<AddIcon />}>
          Add contact
        </Button>
      </form>
    );
  }
}

export default ContactForm;
