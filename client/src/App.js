import React from 'react';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import TodoList from './components/TodoList';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">TodoList</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/signup">Sign Up</Nav.Link>
              <Nav.Link href="/todolist">Todo List</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Container>
          <Row>
            <Col>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={SignUp} />
                <Route path="/todolist" component={TodoList} />
              </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
};


export default App;