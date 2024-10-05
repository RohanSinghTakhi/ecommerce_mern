import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Layout from '../../components/Layout/Layout';
import Input from '../UI/Input';

function SignUp() {
  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: '50px' }}>
          <Col md={{ span: 6, offset: 3 }}>
            <form>
              <Row>
                <Col md={6}>
                  <Input
                    label="First Name"
                    placeholder="First Name"
                    value=""
                    type="text"
                    onChange={() => {}}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    label="Last Name"
                    placeholder="Last Name"
                    value=""
                    type="text"
                    onChange={() => {}}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Input
                    label="Email address"
                    placeholder="Enter your email"
                    value=""
                    type="email"
                    onChange={() => {}}
                    errorMessage="We'll never share your email with anyone else."
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Input
                    label="Password"
                    placeholder="Enter your password"
                    value=""
                    type="password"
                    onChange={() => {}}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <button type="submit" className="btn btn-primary" style={{ marginTop: '20px' }}>
                    Submit
                  </button>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default SignUp;
