import React from 'react';
import {Table,Alert,Card,Row,Col,Container,Spinner} from 'react-bootstrap';
import config from '../config';
import {USDFormat} from '../libs/numberFormat'
import './Dashboard.css';


class Admin extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isLoaded:false,
      accounttype:sessionStorage.getItem("accounttype"),
      userid:sessionStorage.getItem("userid"),
      adminsummary:{
        DailyPnL:0.0,
        UnrealizedPnL:0.0,
        RealizedPnL:0.0,
        TotalCashBalance:0.0,
        Positions:""
      },
    };
    this.refreshAdmin = this.refreshAdmin.bind(this)
  }
  
  
  async refreshAdmin(){
    function sleepSeconds(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    await sleepSeconds(1000)
    const data = {"userid":this.state.userid,"accounttype":this.state.accounttype}
    await fetch(config.apiGateway.URL+"/getadmin", {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(response=>response.json())
      .then(data=>{
        console.log("Fetching admin API")
        console.log(data)
        this.setState({
          adminsummary:data.adminsummary,
        });
        this.setState({isLoaded:true})

      })
      .catch(error=>console.log(error));
  }
  
  async componentDidMount(){
    this.refreshAdmin()
    
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
        <Alert variant="dark">Overview</Alert>
          <Table variant="dark" striped bordered hover>
          
            <tbody>
              <tr>
                <td>Time</td>
                <td>{this.state.adminsummary.AccountUpdatedTime}</td>
              </tr>
              <tr>
                <td>Daily PnL</td>
                <td>{USDFormat(this.state.adminsummary.DailyPnL)}</td>
              </tr>
              <tr>
                <td>UnRealized PnL</td>
                <td>{USDFormat(this.state.adminsummary.UnrealizedPnL)}</td>
              </tr>
              
              <tr>
                <td>Realized PnL</td>
                <td>{USDFormat(this.state.adminsummary.RealizedPnL)}</td>
              </tr>
              <tr>
                <td>Net Liquidation</td>
                <td>{USDFormat(this.state.adminsummary.NetLiquidation)}</td>
              </tr>
              <tr>
                <td>Positions</td>
                <td>{this.state.adminsummary.Positions}</td>
              </tr>
              <tr>
                <td>Buying Power</td>
                <td>{USDFormat(this.state.adminsummary.BuyingPower)}</td>
              </tr>
              <tr>
                <td>Full Init Margin</td>
                <td>{USDFormat(this.state.adminsummary.FullInitMarginReq)}</td>
              </tr>
              <tr>
                <td>Full Maintainence Margin</td>
                <td>{USDFormat(this.state.adminsummary.FullMaintMarginReq)}</td>
              </tr>
              <tr>
                <td>Net Liquidation</td>
                <td>{USDFormat(this.state.adminsummary.NetLiquidation)}</td>
              </tr>
              <tr>
                <td>Full Available Funds</td>
                <td>{USDFormat(this.state.adminsummary.FullAvailableFunds)}</td>
              </tr>
              <tr>
                <td>Full Excess Liquidity</td>
                <td>{USDFormat(this.state.adminsummary.FullExcessLiquidity)}</td>
              </tr>



              
            </tbody>
          </Table>
        </Card>
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
        <br></br>
          
      
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

export default Admin;
