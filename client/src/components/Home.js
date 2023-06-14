import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/Home.css';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Home = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (isLoading) {
      // Simulate loading 200 milliseconds
      const timeout = setTimeout(() => {
        history.push('/todolist');
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [isLoading, history]);
  const handleGetStarted = () => {
    setIsLoading(true);
  };

  return (
    <Container className="text-center">
      <Row>
        <Col>
          <h1>Welcome to Your To-Do App</h1>
          <p className="lead">
            This is a simple to-do application built with React. Stay organized and manage your tasks efficiently.
          </p>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <Button variant="primary" onClick={handleGetStarted}>
              Get Started
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;