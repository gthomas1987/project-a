import React,{useState} from 'react';
import {Card,Form,Button,Container,Row,Col} from 'react-bootstrap';
import { Auth } from "aws-amplify";



function Login(props) {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [accountType,setAccountType] = useState("Live");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleAccountChange(event){
    if(event.target.value==="Live"){
      setAccountType("Paper")
    }
    else{
      setAccountType("Live")
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await Auth.signIn(email, password);
      props.userHasAuthenticated(true);
      sessionStorage.setItem("email",email)
      sessionStorage.setItem("accounttype",accountType)
      props.history.push({pathname:"/dashboard"});
    } catch (e) {
      alert(e.message);
    }
  }
  
  
  return (
    <Container>
      <br></br>
      <Row>
        
        <Col md="auto" lg="4" ></Col>
        <Col md="auto" lg="4" >
        <Card bg="dark" text="white" >
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail"  >
              <Form.Label>Email</Form.Label>
              <Form.Control autoFocus value={email} type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)}/>
              
            </Form.Group>

            <Form.Group  controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control value={password} type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
            </Form.Group>

            <Form.Group  controlId="formAccountType">
            <Form.Check value={accountType} type="checkbox" label="Paper Account" onChange={handleAccountChange} />
            </Form.Group>
            <br></br>
            <Button size="lg" variant="info" disabled={!validateForm()} type="submit" block>
              Submit
            </Button>
          </Form>
          </Card>
        </Col>
        <Col md="auto" lg="4" ></Col>
        
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
