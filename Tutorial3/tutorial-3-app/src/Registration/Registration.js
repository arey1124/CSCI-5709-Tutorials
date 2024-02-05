import './Registration.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";

function Registration() {
  let navigate = useNavigate();
  const [values, setValues] = useState({});
  const [isValidated, setIsValidated] = useState(false);

  const [errors, setErrors] = useState({
        "first-name" : false,
        "last-name" : false,
        "email" : false,
        "password" : false,
        "confirm-password" : false,
  });


  const validateForm = () => {
    for(var field in values) {
      if(field === "first-name" || field === "last-name") {
        setErrors({...errors, [field]: !(/[A-Za-z]+$/.test(String(values[field])))});
      } else if(field === "email") {
        setErrors({...errors, [field]: !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(values[field])))});
      } else if (field === "password") {
        setErrors({...errors, [field]: !(/^(?=.*[a-zA-Z0-9!@#$%^&*])(.{8,})$/.test(String(values[field])))});
      } else if (field === "confirm-password") {
        setErrors({...errors, [field]: !(/^(?=.*[a-zA-Z0-9!@#$%^&*])(.{8,})$/.test(String(values[field]))) || (values[field] !== values["password"])});
      }
    }
  }

  const updateFormValues = (event) => {
    setValues({
      ...values, 
      [event.target.name]: event.target.value,
    }, () => {validateForm()});
  }

  useEffect(()=>{
    validateForm();
  }, [values]);

  useEffect(()=>{
    if(!Object.values(errors).some((value) => value === true) && Object.keys(values).length === 5) {
      setIsValidated(true);
    } else {
      setIsValidated(false);
    }
  }, [values, errors]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if(Object.keys(values).length !== 5) {
      var newErrors = {};
      for(var input of ["first-name", "last-name", "email", "password", "confirm-password"]) {
        if (!values.hasOwnProperty(input)) {
          newErrors[input] = true;
        }
      }
      setErrors({...errors, ...newErrors});
    } else {
      validateForm();
    }

    if (isValidated) {
      navigate("/profile");
    }
  };


  return (
    <div className="Registration">
      <header className="App-header">
      </header>

      <div className="registration-form-div">
        <h1 className="form-header">Register</h1>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3 col-md-6" controlId="first-name">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              name="first-name"
              type="text" 
              placeholder="Enter first name" 
              onChange={updateFormValues}
              isInvalid={errors["first-name"]}/>
            <Form.Control.Feedback type="invalid">
              Please enter a valid First Name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3 col-md-6" controlId="last-name">
            <Form.Label>Last Name</Form.Label>
            <Form.Control 
              name="last-name"
              type="text" 
              placeholder="Enter last name" 
              onChange={updateFormValues}
              isInvalid={errors["last-name"]}/>
            <Form.Control.Feedback type="invalid">
              Please enter a valid Last Name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3 col-md-6" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
              name="email"
              type="text" 
              placeholder="Enter email" 
              onChange={updateFormValues}
              isInvalid={errors["email"]}/>
            <Form.Control.Feedback type="invalid">
              Please enter a valid Email address.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3 col-md-6" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              name="password"
              type="password" 
              placeholder="Password" 
              onChange={updateFormValues}
              isInvalid={errors["password"]}/>
            <Form.Control.Feedback type="invalid">
              Please enter a valid Password. Password can be alpha-numeric and special characters. Minimum 8 characters.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3 col-md-6" controlId="confirm-password">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control 
              name="confirm-password"
              type="password" 
              placeholder="Confirm Password" 
              onChange={updateFormValues}
              isInvalid={errors["confirm-password"]}/>
            <Form.Control.Feedback type="invalid">
              The passwords do not match.
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit" className="col-md-6">
            Register
          </Button>
        </Form>
      </div>   
    </div>
  );
}

export default Registration;
