import React, { useState } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { push } from 'connected-react-router';

const { Group, Label, Control } = Form;
const { Feedback } = Control;

const RegisterForm = ({ push }) => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = event => {
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  const redirectToLogin = () => push('/login');

  const renderFormFields = () => (
    <>
      <Group controlId="formUsername">
        <Label>Username</Label>
        <Control placeholder="Enter username" required />
        <Feedback>Looks good!</Feedback>
      </Group>

      <Group controlId="formBasicEmail">
        <Label>Email address</Label>
        <Control type="email" placeholder="Enter email" required />
        <Feedback>Looks good!</Feedback>
      </Group>

      <Group controlId="formBasicPassword">
        <Label>Password</Label>
        <Control type="password" placeholder="Password" required />
        <Feedback>Looks good!</Feedback>
      </Group>

      <Group controlId="confirmPassword">
        <Label>Confirm Password</Label>
        <Control type="password" placeholder="Confirm Password" required />
        <Feedback>Looks good!</Feedback>
      </Group>
    </>
  );

  const renderBtns = () => (
    <>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <div className="text-center" style={{ marginTop: 10 }}>
        <Button variant="link" size="sm" onClick={() => redirectToLogin()}>
          Sign In
        </Button>
      </div>
    </>
  );

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={6}>
          <div
            style={{
              marginTop: 20,
              border: '1px solid #80808029',
              padding: 20,
            }}
          >
            <h4 className="text-center">Register</h4>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              {renderFormFields()}
              {renderBtns()}
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

RegisterForm.propTypes = {
  push: func.isRequired,
};

export default connect(null, { push })(RegisterForm);
