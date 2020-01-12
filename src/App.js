import React,{useState,useEffect} from 'react';
import Routes from "./Routes";
import {Navbar,Nav} from 'react-bootstrap';
import { Auth } from "aws-amplify";
import { withRouter} from "react-router-dom";
import './App.css';

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
      <Navbar bg="info" >
        <Navbar.Brand style={{color: "white", fontWeight:"bold"}} href="/">
        <img className="roundrect"
        alt=""
        src="/gt_algo_logo5.jpg"
        width="120"
        height="50"
      />{' '}Algos</Navbar.Brand>
          {isAuthenticated
          ? <>
          <Nav className="ml-auto">
            <Nav.Link style={{color: "white", fontWeight:"bold"}}  onClick={handleLogout}>Log Out</Nav.Link>
          </Nav>
            </>
          : <>
          <Navbar.Collapse>
            <Nav className="ml-auto">
              <Nav.Link style={{color: "white", fontWeight:"bold"}}  href="/signup">Sign Up</Nav.Link>
              <Nav.Link style={{color: "white", fontWeight:"bold"}} href="/login">Log In</Nav.Link>
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
