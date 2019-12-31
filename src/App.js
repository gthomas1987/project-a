import React,{useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import NavigBar from './components/NavigBar';
import Home from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import About from './components/About';
import Algos from './components/Algos';
import Routes from "./Routes";


function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  return (
    <div>
      <NavigBar />
      <Routes />
    </div>
  );
}

export default App;
