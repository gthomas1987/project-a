import React,{useState} from 'react';
import {Form,Button,Container,Row,Col} from 'react-bootstrap';
import { Auth } from "aws-amplify";



function Login(props) {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
  
    try {
      await Auth.signIn(email, password);
      props.userHasAuthenticated(true);
      props.history.push({pathname:"/dashboard",state:{email}});
    } catch (e) {
      alert(e.message);
    }
  }
  
  
  return (
    <Container>
      <br></br>
      <Row>
        <Col></Col>
        <Col md="auto">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control autoFocus value={email} type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)}/>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control value={password} type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
            </Form.Group>
            <br></br>
            <Button variant="info" disabled={!validateForm()} type="submit">
              Submit
            </Button>
          </Form>
        </Col>
        <Col></Col>
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

export default Login;
