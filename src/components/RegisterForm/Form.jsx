import React from 'react';
import { func, shape, string, bool } from 'prop-types';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const { Group, Label, Control } = Form;
const { Feedback } = Control;

const BaseForm = ({
  onSubmit,
  onChange,
  onBlur,
  values,
  touched,
  isValid,
  errors,
  onRedirect,
}) => {
  const isValidField = name =>
    touched[name] && !errors[name] ? 'valid' : 'invalid';

  const renderFormFields = () => (
    <>
      <Group controlId="formUsername">
        <Label>Username</Label>
        <Control
          placeholder="Enter username"
          type="text"
          name="username"
          value={values.username}
          onChange={onChange}
          onBlur={onBlur}
          isValid={touched.username && !errors.username}
          isInvalid={!!errors.username}
        />
        <Feedback type={isValidField('username')}>{errors.username}</Feedback>
      </Group>

      <Group controlId="formBasicEmail">
        <Label>Email address</Label>
        <Control
          placeholder="Enter email"
          type="email"
          name="email"
          value={values.email}
          onChange={onChange}
          onBlur={onBlur}
          isValid={touched.email && !errors.email}
          isInvalid={!!errors.email}
        />
        <Feedback type={isValidField('email')}>{errors.email}</Feedback>
      </Group>

      <Group controlId="formBasicPassword">
        <Label>Password</Label>
        <Control
          placeholder="Password"
          type="password"
          name="password"
          value={values.password}
          onChange={onChange}
          onBlur={onBlur}
          isValid={touched.password && !errors.password}
          isInvalid={!!errors.password}
        />
        <Feedback type={isValidField('password')}>{errors.password}</Feedback>
      </Group>

      <Group controlId="confirmPassword">
        <Label>Confirm Password</Label>
        <Control
          placeholder="Confirm Password"
          type="password"
          name="passwordConfirm"
          value={values.passwordConfirm}
          onChange={onChange}
          onBlur={onBlur}
          isValid={touched.passwordConfirm && !errors.passwordConfirm}
          isInvalid={!!errors.passwordConfirm}
        />
        <Feedback type={isValidField('passwordConfirm')}>
          {errors.passwordConfirm}
        </Feedback>
      </Group>
    </>
  );

  const renderBtns = () => (
    <>
      <Button variant="primary" type="submit" disabled={!isValid}>
        Submit
      </Button>
      <div className="text-center" style={{ marginTop: 10 }}>
        <Button variant="link" size="sm" onClick={() => onRedirect()}>
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
            <Form noValidate onSubmit={onSubmit}>
              {renderFormFields()}
              {renderBtns()}
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

BaseForm.propTypes = {
  values: shape({
    username: string.isRequired,
  }),
  touched: shape({
    username: bool,
  }),
  errors: shape({}),
  onSubmit: func.isRequired,
  onChange: func.isRequired,
  onBlur: func.isRequired,
  onRedirect: func.isRequired,
  isValid: bool.isRequired,
};

BaseForm.defaultProps = {
  values: {
    username: '',
  },
  touched: {
    username: false,
  },
  errors: {},
};

export default BaseForm;
