import React,{useState,useEffect} from 'react';
import Routes from "./Routes";
import {Navbar,Nav} from 'react-bootstrap';
import { Auth } from "aws-amplify";
import { withRouter} from "react-router-dom";
import './App.css';
import SideNavigation from './components/SideNavigation'

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

  async function handleLogin() {
    props.history.push("/login");
  }

  async function handleSignup() {
    props.history.push("/signup");
  }

  return (
    !isAuthenticating &&
    <div >
      
        
        
      <Navbar style={{'background-color': '#000000'}}  >
        <Navbar.Brand style={{color:'white',fontWeight:"bold"}} href="/">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        GT ALGOS
      </Navbar.Brand>
          {isAuthenticated
          ? <>
          <Nav className="ml-auto">
            <Nav.Link style={{color:'white',fontWeight:"bold"}}  onClick={handleLogout}>Log Out</Nav.Link>
          </Nav>
            </>
          : <>
          <Navbar.Collapse>
            <Nav className="ml-auto">
              <Nav.Link style={{color:'white',fontWeight:"bold"}}  onClick={handleSignup}>Sign Up</Nav.Link>
              <Nav.Link style={{color:'white',fontWeight:"bold"}} onClick={handleLogin}>Log In</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          </>
          }
        </Navbar>
        
          <SideNavigation/>
          <div style={{'background-color': '#000000'}}  className="Home">
            <div style={{'background-color': '#000000'}}  className="sidenav">
          <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
          </div>
          </div>
    </div>
  );
}

export default withRouter(App);
