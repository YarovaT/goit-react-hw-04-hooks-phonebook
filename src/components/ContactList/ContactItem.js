import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
  root: {
    background: 'grey',
    border: 0,
    borderRadius: 3,
    color: 'black',
    padding: '2px 5px',
    margin: '5px 15px',
    cursor: 'pointer',
  },
});

const ContactItem = ({ name, number, onClick }) => {
  const classes = useStyles();

  return (
    <>
      {name}: {number}
      <Button
        type="button"
        variant="contained"
        color="secondary"
        className={classes.root}
        startIcon={<DeleteIcon />}
        onClick={onClick}
      >
        Delete
      </Button>
    </>
  );
};

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ContactItem;
