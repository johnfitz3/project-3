import React from 'react';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import TodoList from './TodoList';

const App = () => {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#">Your App Name</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">Login</Nav.Link>
            <Nav.Link href="#">Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container>
        <Row>
          <Col>
            <TodoList />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
