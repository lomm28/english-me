import React, { useState } from 'react';
import Notification from '../Notification';

const withNotification = Component => {
  const Composed = props => {
    const [notification, updateNotification] = useState({
      shown: false,
      error: false,
      message: '',
    });

    const hideNotification = () =>
      updateNotification({
        shown: false,
        error: false,
        message: '',
      });

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
        <Component {...props} updateNotification={updateNotification} />
      </>
    );
  };
  return Composed;
};

export default withNotification;
