import React from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Formik } from 'formik';

import createUser from './actions';
import Form from './Form';
import schema from './schema';

const RegisterForm = ({ push, createUser }) => {
  const redirectToLogin = () => push('/login');

  const registerUser = (values, actions) => {
    createUser(values);
    actions.resetForm();
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={registerUser}
      initialValues={{
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form
          onSubmit={handleSubmit}
          onChange={handleChange}
          onBlur={handleBlur}
          values={values}
          touched={touched}
          isValid={isValid}
          errors={errors}
          onRedirect={redirectToLogin}
        />
      )}
    </Formik>
  );
};

RegisterForm.propTypes = {
  push: func.isRequired,
  createUser: func.isRequired,
};

export default connect(null, { push, createUser })(RegisterForm);
