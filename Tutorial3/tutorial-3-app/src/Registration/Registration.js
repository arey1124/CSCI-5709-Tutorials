import './Registration.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';

function App() {
  const [values, setValues] = useState({});
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
    });
  }

  useEffect(()=>{
    validateForm();
  }, [values]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if(Object.keys(values).length === 0) {
      setErrors({...errors,
        "first-name" : true,
        "last-name" : true,
        "email" : true,
        "password" : true,
        "confirm-password" : true,
      });
    }

    if (Object.values(errors).some((value) => value === true)) {
      console.log("Error");
    }
  };


  return (
    <div className="Registration">
      <header className="App-header">
      </header>

      <div className="registration-form-div">
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="first-name">
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

          <Form.Group className="mb-3" controlId="last-name">
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

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
              name="email"
              type="email" 
              placeholder="Enter email" 
              onChange={updateFormValues}
              isInvalid={errors["email"]}/>
            <Form.Control.Feedback type="invalid">
              Please enter a valid Email address.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
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

          <Form.Group className="mb-3" controlId="confirm-password">
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

          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </div>   
    </div>
  );
}

export default App;
