import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, InputGroup } from 'react-bootstrap';
import { Envelope, Lock } from 'react-bootstrap-icons';
import "./Login.css";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Login() {
  let navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(false);
  const LOGIN_URL = "https://express-t4.onrender.com/api/login";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(false);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      const data = {
        username: email,
        password: password,
      }
      axios.post(LOGIN_URL, data).then((response) => {
        navigate('/profile/listings');
      }).catch((error) => {
        if (error.response && error.response.status === 401) {
          setError(true);
        }
      });
    }
    setValidated(true);
  }

  return (
    <>
      <Container className="login-div">
        <h1 className="form-title">Sign In</h1>
        <div id="signInMessage" className="text-center"></div>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <InputGroup className="mb-3">
                <InputGroup.Text id="email-input"><Envelope/></InputGroup.Text>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    aria-label="Email"
                    aria-describedby="email-input"
                    className="email-textbox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">Please provide a valid email address.</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="password">
              <InputGroup className="mb-3">
                  <InputGroup.Text id="password-input"><Lock/></InputGroup.Text>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      aria-label="Password"
                      aria-describedby="password-input"
                      className="password-textbox"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Form.Control.Feedback type="invalid">Please provide a password.</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Button type="submit" variant="primary" className="btn-submit">SIGN IN</Button>
            {error && 
              <div>
                <span class="error-text">Invalid credentials. Please enter a valid username and password.</span>
              </div>
            }
        </Form>
      </Container>
    </>
    
  );
}

export default Login;
