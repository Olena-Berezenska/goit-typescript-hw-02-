import React, { FC } from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import stl from './SearchBar.module.css';
type Props = {
  handleChangeQuery: (newQuery: string) => void;
};
type FormValues = {
  query: string;
};
const SearchBar: React.FC<Props> = ({ handleChangeQuery }) => {
  const initialValues: FormValues = {
    query: '',
  };
  const handleSubmit = (
    values: FormValues,
    options: FormikHelpers<FormValues>
  ) => {
    if (values.query.trim() !== '') {
      handleChangeQuery(values.query);
      options.resetForm();
    } else {
      toast.error('Enter some text');
    }
  };
  return (
    <header>
      <Formik<FormValues> onSubmit={handleSubmit} initialValues={initialValues}>
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
