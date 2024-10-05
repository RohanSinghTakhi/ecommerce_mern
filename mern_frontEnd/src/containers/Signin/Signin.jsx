import React from 'react';
import Layout from '../../components/Layout/Layout';
import { Col, Container, Row, Button } from 'react-bootstrap';
import Input from '../UI/Input'; // Make sure the path to the Input component is correct

function Signin() {
  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: '50px' }}>
          <Col md={{ span: 6, offset: 3 }}>
            <form>
              {/* Username Input using the Input component */}
              <Input 
                label="Username"
                type="text"
                placeholder="Enter your username"
                value=""
                onChange={() => {}}
              />

              {/* Email Input using the Input component */}
              <Input 
                label="Email address"
                type="email"
                placeholder="Enter email"
                value=""
                onChange={() => {}}
              />

              {/* Password Input using the Input component */}
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value=""
                onChange={() => {}}
              />

              {/* Submit Button */}
              <Button variant="primary" className='mb-6' type="submit">
                Submit
              </Button>
            </form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default Signin;
