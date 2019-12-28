import React,{useState} from 'react';
import {Form,Button,Container,Row,Col} from 'react-bootstrap';


function Home(props) {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }
  
  
  return (
    <Container>
      <br></br>
      <br></br>
      <br></br>
      <Row>
        <Col></Col>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
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
            <Button  disabled={!validateForm()} variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
        <Col></Col>
      </Row>
    </Container>
   
  );
}

export default Home;
