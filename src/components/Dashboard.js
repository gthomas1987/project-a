import React from 'react';
import {Alert,Card,Spinner,Container,Row,Col} from 'react-bootstrap';
import Summary from './Summary'
import CurrentAlgos from './CurrentAlgos'
import AllAlgos from './AllAlgos'
import config from '../config';
import { Auth } from "aws-amplify";
import NPVChart from './NPVChart'
import AllocationChart from './AllocationChart'
import './Dashboard.css';


class Dashboard extends React.Component{
  constructor(props){
    super(props);
    console.log("Dashboard contructor")
    console.log(sessionStorage.getItem("accounttype"))
    this.state={
      isLoaded:false,
      accounttype:sessionStorage.getItem("accounttype"),
      userid:"",
      summary:{
        pnl:0.0,
        npv:0.0,
        accountbalance:0.0,
        amountallocated:0.0,
        usagelevel:"0.0%",
        amountfree:0.0
      },
      npvChart:[],
      allAlgos:[],
      clientAlgos:[],
      allAlgosDetails:{},
      allocationDetails:{}
    };
    this.refreshDashboard = this.refreshDashboard.bind(this)
  }
  
  
  async refreshDashboard(){
    function sleepSeconds(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    await sleepSeconds(1000)
    const data = {"userid":this.state.userid,"accounttype":this.state.accounttype}
    await fetch(config.apiGateway.URL+"/getsummary", {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(response=>response.json())
      .then(data=>{
        console.log("Fetching summary API")
        console.log(data)
        //console.log(data.allAlgosDetails)
        this.setState({
          summary:data.summary,
          npvChart:data.npvChart,
          allAlgos:data.allAlgos,
          clientAlgos:data.clientAlgos,
          allAlgosDetails:data.allAlgosDetails,
          allocationDetails:data.allocation,
        });
        this.setState({isLoaded:true})

      })
      .catch(error=>console.log(error));
  }
  
  async componentDidMount(){
    await Auth.currentAuthenticatedUser({
      bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
    .then(user => {
      sessionStorage.setItem("userid",user.username)
      this.setState({userid:user.username})
      
      }
    )
    .catch(err => console.log(err));

    this.refreshDashboard()
    
    
  }

  

  
  
  render(){
    
    return (
      
      <div style={{'background-color': '#000000'}} >
        {this.state.isLoaded
        ?
        <div style={{'background-color': '#000000'}}>
          {this.state.accounttype==="Live"
          ?
          <Alert variant="primary">
            <Alert.Heading>Live Account</Alert.Heading>
          </Alert>
          :
          <Alert variant="danger">
            <Alert.Heading>Paper Account</Alert.Heading>
          </Alert>
          
          }
          
        <Card bg="dark">
        <Row>
          <Col md="auto" lg="4" >
          <Summary summary={this.state.summary} refresh={this.refreshDashboard} />
          </Col>
          <Col md="auto" lg="4" >
          <NPVChart npvChart={this.state.npvChart}/>
          </Col>
          <Col md="auto" lg="4" >
          <AllocationChart allocation={this.state.allocationDetails}/>
          </Col>
        </Row>
        </Card>
        <br></br>
        
            <Row>
              <Col>
            <AllAlgos  allAlgos={this.state.allAlgos} allAlgosDetails={this.state.allAlgosDetails} summary={this.state.summary} refresh={this.refreshDashboard}/>
            </Col>
            </Row>
            <Row>
              <Col>
            <CurrentAlgos allAlgosDetails={this.state.allAlgosDetails} clientAlgos={this.state.clientAlgos} summary={this.state.summary} refresh={this.refreshDashboard}/>
            </Col>
            </Row>
            
      
      </div>
      :
      <div style={{'background-color': '#000000'}}>
        <Container>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Row>
        <Col></Col>
        <Col md="auto">
          <Spinner animation="border" variant ="info" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Col>
        <Col></Col>
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
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        
        </Row>
        </Container>
      </div>
      }
      </div>
    );
  }
}

export default Dashboard;
