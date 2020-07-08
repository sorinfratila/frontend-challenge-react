import React from 'react';
import PropTypes from 'prop-types';
import classes from './AddPhoto.module.scss';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';

function AddPhoto({ file, setFile, setModalState, addPhotoHandler }) {
  return (
    <>
      <section className={classes.container}>
        <img
          src={file.value === '' ? file.value : URL.createObjectURL(file.value)}
          alt="Image"
        />
        <Input
          elementConfig={file.elementConfig}
          elementType={file.elementType}
          changed={e => setFile({ ...file, value: e.target.files[0] })}></Input>
      </section>
      <footer className={classes.modalFooter}>
        <Button onClick={() => setModalState(false)}>Cancel</Button>
        <Button type="primary" onClick={addPhotoHandler}>
          Apply
        </Button>
      </footer>
    </>
  );
}

AddPhoto.propTypes = {
  file: PropTypes.object,
  setFile: PropTypes.func,
  setModalState: PropTypes.func,
  addPhotoHandler: PropTypes.func,
};

export default AddPhoto;
