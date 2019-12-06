import React, { useState } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { push } from 'connected-react-router';

import loginUser from './actions';
import withNotification from '../hoc/withNotification';

const { Group, Label, Control } = Form;

const style = {
  formContainer: {
    marginTop: 20,
    border: '1px solid #80808029',
    padding: 20,
  },
  spinner: {
    position: 'absolute',
    left: '45%',
    top: '50%',
  },
  signUpBtn: {
    marginTop: 10,
  },
};

const LoginForm = ({ push, loginUser, updateNotification }) => {
  const [creds, updateCreds] = useState({ username: '', password: '' });
  const [isLoading, setLoading] = useState(false);

  const { username, password } = creds;

  const handleSubmit = event => {
    event.preventDefault();
    setLoading(true);
    if (username && password) {
      loginUser(creds)
        .then(data => {
          updateNotification({
            shown: true,
            error: false,
            message: data.message,
          });
        })
        .catch(e => {
          updateNotification({
            shown: true,
            error: true,
            message: e.data.message,
          });
        })
        .finally(() => setLoading(false));
    }
  };

  const redirectToRegister = () => push('/register');

  const handleChange = e => {
    updateCreds({ ...creds, [e.target.name]: e.target.value });
  };

  const renderFormFields = () => (
    <>
      <Group controlId="formBasicEmail">
        <Label>Username</Label>
        <Control
          type="text"
          name="username"
          placeholder="Enter username"
          onChange={handleChange}
          value={creds.username}
          required
        />
      </Group>

      <Group controlId="formBasicPassword">
        <Label>Password</Label>
        <Control
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={creds.password}
          required
        />
      </Group>
    </>
  );

  const renderBtns = () => {
    const isSubmitDisabled = !username || !password || isLoading;
    return (
      <>
        <Button variant="primary" type="submit" disabled={isSubmitDisabled}>
          Submit
        </Button>
        <div className="text-center" style={style.signUpBtn}>
          <Button variant="link" size="sm" onClick={() => redirectToRegister()}>
            Sign Up
          </Button>
        </div>
      </>
    );
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={6}>
          <div style={style.formContainer}>
            {isLoading && (
              <Spinner
                animation="border"
                variant="primary"
                style={style.spinner}
              />
            )}
            <h4 className="text-center">Login</h4>
            <Form noValidate onSubmit={handleSubmit}>
              {renderFormFields()}
              {renderBtns()}
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

LoginForm.propTypes = {
  push: func.isRequired,
  loginUser: func.isRequired,
  updateNotification: func.isRequired,
};

export default connect(null, { push, loginUser })(withNotification(LoginForm));
