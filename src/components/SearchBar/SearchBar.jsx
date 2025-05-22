import React from 'react';
import { Formik, Field, Form } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import stl from './SearchBar.module.css';

const SearchBar = ({ handleChangeQuery }) => {
  const initialValues = {
    query: '',
  };
  const handleSubmit = (values, options) => {
    if (values.query.trim() !== '') {
      handleChangeQuery(values.query);
      options.resetForm();
    } else {
      toast.error('Enter some text');
    }
  };
  return (
    <header>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form className={stl.searchBarPannel}>
          <Field name="query" className={stl.fieldInput} />
          <button type="submit">Search</button>
        </Form>
      </Formik>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </header>
  );
};

export default SearchBar;
