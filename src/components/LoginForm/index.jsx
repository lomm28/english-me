import React from 'react';
import { Form, Button, Container, Row } from 'react-bootstrap';

const { Group, Label, Control, Text, Check } = Form;

const LoginForm = () => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Form>
          <Group controlId="formBasicEmail">
            <Label>Email address</Label>
            <Control type="email" placeholder="Enter email" />
            <Text className="text-muted">
              We&#39;ll never share your email with anyone else.
            </Text>
          </Group>

          <Group controlId="formBasicPassword">
            <Label>Password</Label>
            <Control type="password" placeholder="Password" />
          </Group>
          <Group controlId="formBasicCheckbox">
            <Check type="checkbox" label="Check me out" />
          </Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default LoginForm;
