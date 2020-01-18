import React, { useState } from "react";
import {
  Card,
  FormGroup,
  FormControl,
  FormLabel,
  Container,
  Col,
  Row
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import ConfirmationForm from "./ConfirmationForm";
import { useFormFields } from "../libs/hooksLib";
import {Auth} from 'aws-amplify';

export default function Signup(props) {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: ""
  });
  const [newUser, setNewUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  
  async function handleSubmit(event) {
    event.preventDefault();
  
    setIsLoading(true);
  
    try {
      const newUser = await Auth.signUp({
        username: fields.email,
        password: fields.password
      });
      setIsLoading(false);
      setNewUser(newUser);
    } catch (e) {
      if(e.name === 'UsernameExistsException') {
        alert("You are already registered. Please LogIn!");
        props.history.push({pathname:"/login"});
      }
      else{
        alert(e.message);
      }
      setIsLoading(false);  
    }
  }

  
  
  function renderForm() {
    return (
        <Container>
          <br></br>
            <Row>
                <Col md="auto" lg="4"></Col>
                <Col md="auto" lg="4">
                <Card bg="dark" text="white">
                    <form  onSubmit={handleSubmit}>
                        <FormGroup controlId="email" bssize="large">
                        <FormLabel>Email</FormLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={fields.email}
                            onChange={handleFieldChange}
                        />
                        </FormGroup>
                        <FormGroup controlId="password" bssize="large">
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            type="password"
                            value={fields.password}
                            onChange={handleFieldChange}
                        />
                        </FormGroup>
                        <FormGroup controlId="confirmPassword" bssize="large">
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl
                            type="password"
                            onChange={handleFieldChange}
                            value={fields.confirmPassword}
                        />
                        </FormGroup>
                        <LoaderButton
                        block
                        type="submit"
                        bssize="large"
                        variant="primary"
                        isLoading={isLoading}
                        disabled={!validateForm()}
                        >
                        Signup
                        </LoaderButton>
                    </form>
                    </Card>
            </Col>
            <Col  md="auto" lg="4"></Col>
            </Row>
            <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      </Container>
    );
  }

  return (
    <div className="Signup">
      {newUser === null ? renderForm() : <ConfirmationForm email={fields.email} password={fields.password} /> }
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}