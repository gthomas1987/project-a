import React from "react";
import "./Home.css";
import {Button} from 'react-bootstrap'

export default function Home(props) {
  return (
    <div className="Home">
      <div className="lander">
        
        <Button variant="info" size="lg" href="/dashboard" >Open Dashboard</Button>
        
      </div>
    </div>
  );
}