import React,{useState} from 'react';
import {Card,Form,Button,Container,Row,Col} from 'react-bootstrap';
import { Auth } from "aws-amplify";
import {Link} from 'react-router-dom';
import ConfirmationForm from "./ConfirmationForm";


function Login(props) {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [accountType,setAccountType] = useState("Live");
  const [unconfirmedUser, setUnconfirmedUser] = useState(null);

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

  function handleConfirm(){
    setUnconfirmedUser(null)
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
      if(e.name === 'UserNotConfirmedException') {
        alert("You are not verified. Resending the verification code to " + email);
        await Auth.resendSignUp(email);
        setUnconfirmedUser(email)
      } else {
          alert(e.message);
      }
    }
  }
  
  function renderForm(){
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

            
            <Link to="/login/reset">Forgot password?</Link>
            
            <br></br>
            <br></br>
            <Button size="lg" variant="primary" disabled={!validateForm()} type="submit" block>
              Submit
            </Button>
          </Form>

          </Card>
        </Col>
        <Col md="auto" lg="4" ></Col>
        
      </Row>
    </Container>
    )
  }

  
  return (
    <div className="Signup">
    {unconfirmedUser === null ? renderForm() : <ConfirmationForm email={email} confirmed={handleConfirm}/> }
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
    </div>
   
   
  );
}

export default Login;
