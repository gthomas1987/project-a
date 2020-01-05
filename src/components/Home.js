import React from "react";
import "./Home.css";
import {Button} from 'react-bootstrap'

export default function Home(props) {
  return (
    <div className="Home">
      <div className="lander">
        <h1>GT Algos</h1>
        <Button href="/dashboard">Dashboard</Button>
        
      </div>
    </div>
  );
}