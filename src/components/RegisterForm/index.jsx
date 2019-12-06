import React, { useState } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Formik } from 'formik';

import createUser from './actions';
import Form from './Form';
import schema from './schema';
import withNotification from '../hoc/withNotification';

const RegisterForm = ({ push, createUser, updateNotification }) => {
  const [isLoading, setLoading] = useState(false);
  const redirectToLogin = () => push('/login');

  const registerUser = (values, actions) => {
    setLoading(true);
    createUser(values)
      .then(data => {
        updateNotification({
          shown: true,
          error: false,
          message: data.message,
        });
      })
      .then(() => redirectToLogin())
      .catch(e => {
        updateNotification({
          shown: true,
          error: true,
          message: e.data.message,
        });
        setLoading(false);
        actions.resetForm();
      });
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
          isLoading={isLoading}
        />
      )}
    </Formik>
  );
};

RegisterForm.propTypes = {
  push: func.isRequired,
  createUser: func.isRequired,
  updateNotification: func.isRequired,
};

export default connect(null, { push, createUser })(
  withNotification(RegisterForm),
);
