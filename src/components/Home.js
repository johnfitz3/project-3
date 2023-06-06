import React from 'react';
import {useHistory} from 'react-router-dom';
import '../styles/Home.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
//Get started goes to login
const Home = () => {
  const history = useHistory();
  const handleGetStarted = () => {
    history.push('/login');
  };


  return (
    <Container className="text-center">
      <Row>
        <Col>
          <h1>Welcome to Your Todo App</h1>
          <p className="lead">
            This is a simple todo application built with React. Stay organized and manage your tasks efficiently.
          </p>
          <Button variant="primary" onClick={handleGetStarted}>Get Started</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;