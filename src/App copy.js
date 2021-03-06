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
    props.history.push("/");
  }

  return (
    !isAuthenticating &&
    <div >
      
        
        
      <Navbar bg="light" >
        <Navbar.Brand style={{color: "white", fontWeight:"bold"}} href="/">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <img className="roundrect"
        alt=""
        src="/gt_algo_logo6.jpg"
        width="120"
        height="38"
        />
      </Navbar.Brand>
          {isAuthenticated
          ? <>
          <Nav className="ml-auto">
            <Nav.Link style={{fontWeight:"bold"}}  onClick={handleLogout}>Log Out</Nav.Link>
          </Nav>
            </>
          : <>
          <Navbar.Collapse>
            <Nav className="ml-auto">
              <Nav.Link style={{fontWeight:"bold"}}  href="/signup">Sign Up</Nav.Link>
              <Nav.Link style={{fontWeight:"bold"}} href="/login">Log In</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          </>
          }
        </Navbar>
        
          <SideNavigation/>
          <div className="Home">
            <div className="sidenav">
          <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
          </div>
          </div>
    </div>
  );
}

export default withRouter(App);
