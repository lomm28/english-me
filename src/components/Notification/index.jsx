import React from 'react';
import { func, string } from 'prop-types';
import { Alert } from 'react-bootstrap';

const { Heading } = Alert;

const style = {
  container: {
    margin: 10,
    textAlign: 'center',
  },
};

const Notification = ({ hideNotification, message, variant }) => {
  const heading =
    variant === 'danger' ? 'Oh snap! You got an error!' : 'All is good!';

  return (
    <div style={style.container}>
      <Alert variant={variant} onClose={() => hideNotification()} dismissible>
        <Heading>{heading}</Heading>
        <p>{message}</p>
      </Alert>
    </div>
  );
};

Notification.propTypes = {
  hideNotification: func.isRequired,
  message: string,
  variant: string,
};

Notification.defaultProps = {
  message: '',
  variant: 'success',
};

export default Notification;
