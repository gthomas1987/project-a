import React,{useState,useEffect} from 'react';
import Routes from "./Routes";
import {Navbar,Nav} from 'react-bootstrap';
import { Auth } from "aws-amplify";
import { withRouter } from "react-router-dom";


function App(props) {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    onLoad();
  }, []);
  
  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
  
    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();
  
    userHasAuthenticated(false);
    props.history.push("/login");
  }

  return (
    !isAuthenticating &&
    <div>
      <Navbar bg="light" variant="light">
        <Navbar.Brand>Algo Storm</Navbar.Brand>
          {isAuthenticated
          ? <>
          
          <Nav className="ml-auto">
            <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>
          </Nav>
            </>
          : <>
          <Nav className="ml-auto">
            <Nav.Link href="/signup">Sign up</Nav.Link>
            <Nav.Link href="/login">Log In</Nav.Link>
          </Nav>
          </>
          }
        </Navbar>
      <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
    </div>
  );
}

export default withRouter(App);
