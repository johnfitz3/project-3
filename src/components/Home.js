import React from 'react';
import '../styles/Home.css';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Home = () => {
  return (
    <Container className="text-center">
      <Row>
        <Col>
          <h1>Welcome to Your Todo App</h1>
          <p className="lead">
            This is a simple todo application built with React. Stay organized and manage your tasks efficiently.
          </p>
          <Button variant="primary">Get Started</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;