import React,{useState,useEffect} from 'react';
import Routes from "./Routes";
import {Navbar,Nav,NavItem} from 'react-bootstrap';
import { Auth } from "aws-amplify";
import { withRouter} from "react-router-dom";
import {LinkContainer} from 'react-router-bootstrap'


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
          ?
            <NavItem onClick={handleLogout}>Log Out</NavItem>
          : <>
          <Navbar.Collapse>
            <Nav pullRight>
              <LinkContainer to="/signup">
                <NavItem>Signup</NavItem>
              </LinkContainer>
              <LinkContainer to="/login">
                <NavItem>Login</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
          </>
          }
        </Navbar>
      <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
    </div>
  );
}

export default withRouter(App);
