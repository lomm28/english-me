import React, { useState } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Formik } from 'formik';

import createUser from './actions';
import Form from './Form';
import schema from './schema';
import Notification from '../Notification';

const RegisterForm = ({ push, createUser }) => {
  const [notification, updateNotification] = useState({
    shown: false,
    error: false,
    message: '',
  });

  const redirectToLogin = () => push('/login');

  const hideNotification = () =>
    updateNotification({
      shown: false,
      error: false,
      message: '',
    });

  const registerUser = (values, actions) => {
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
        actions.resetForm();
      });
  };

  const { shown, message, error } = notification;

  return (
    <>
      {shown && (
        <Notification
          message={message}
          hideNotification={hideNotification}
          variant={error ? 'danger' : 'success'}
        />
      )}
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
    </>
  );
};

RegisterForm.propTypes = {
  push: func.isRequired,
  createUser: func.isRequired,
};

export default connect(null, { push, createUser })(RegisterForm);
