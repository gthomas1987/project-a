import React,{useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import NavigBar from './components/NavigBar';
import Home from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import About from './components/About';
import Algos from './components/Algos';


function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  return (
    <div>
      <NavigBar />
      <Router>
        <Switch>
          <Route exact path="/" component={Signup} />
          <Route path="/algos" component={Algos} />
          <Route path="/about" component={About} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
