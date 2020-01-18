import React from 'react';
import ReactApexChart from 'react-apexcharts';
import {Alert,Container,Row,Col,Spinner} from 'react-bootstrap';
import config from '../config';

class AlgosChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accounttype:props.accounttype,
      show:false,
      seriesTop: [{
        data: []
      }],
      optionsTop: {
        chart: {
          type: 'bar',
        },
        plotOptions: {
          bar: {
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: [],
        }
      },
      seriesBottom: [{
        data: []
      }],
      optionsBottom: {
        chart: {
          type: 'bar',
        },
        plotOptions: {
          bar: {
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: [],
        }
      },
    
      
    };
    this.handleClose = this.handleClose.bind(this)
    this.handleShow = this.handleShow.bind(this)
    this.runQuery = this.runQuery.bind(this)
  }

  handleClose = () => this.setState({show:false});
  handleShow = () => this.setState({show:true});

  async runQuery(){
    const data = {"accounttype":this.state.accounttype}
    await fetch(config.apiGateway.URL+"/getalgoperformance", {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
    })
    .then(response=>response.json())
    .then(data=>{
      console.log("Fetching top algos API")
      console.log(data)
      this.setState({
        show:true,
        seriesTop: [{
          data: Object.values(data.topalgos)
        }],
        optionsTop: {
          tooltip:{
            theme:"dark"
          },
          chart: {
            foreColor: '#ffffff',
            type: 'bar',
          },
          plotOptions: {
            bar: {
              horizontal: true,
            }
          },
          dataLabels: {
            enabled: false
          },
          xaxis: {
            categories: Object.keys(data.topalgos) ,
          }
        },
        seriesBottom: [{
          data: Object.values(data.bottomalgos)
        }],
        optionsBottom: {
          tooltip:{
            theme:"dark"
          },
          chart: {
            foreColor: '#ffffff',
            type: 'bar',
          },
          plotOptions: {
            bar: {
              horizontal: true,
            }
          },
          dataLabels: {
            enabled: false
          },
          xaxis: {
            categories: Object.keys(data.bottomalgos) ,
          }
        },
      
        
      })

    })
    .catch(error=>console.log(error));
  }

  componentDidMount(){
    this.runQuery()
  }

  render() {
    return (
      
      <div id="chart">
      {this.state.show
        ?
        <>
        <Row>
        <Col>
        <Alert variant="info">
          <Alert.Heading>Top Performing Algos</Alert.Heading>
        </Alert>
        <ReactApexChart options={this.state.optionsTop} series={this.state.seriesTop} type="bar" />
        </Col>
        <Col>
        <Alert variant="info">
          <Alert.Heading>Bottom Performing Algos</Alert.Heading>
        </Alert>
        <ReactApexChart options={this.state.optionsBottom} series={this.state.seriesBottom} type="bar"  />
        </Col>
        </Row>
        </>
        :
      <div>
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
        </Row>
        </Container>
        </div>
        }
        </div>
    );
  }
}

export default AlgosChart