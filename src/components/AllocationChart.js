import React from 'react';
import ReactApexChart from 'react-apexcharts';
import {Alert} from 'react-bootstrap'

class AllocationChart extends React.Component {
        constructor(props) {
          super(props);

          this.state = {
          
            series: [],
            options: {
              labels: [],
              chart: {
                foreColor: '#ffffff',
                type: 'donut',
              }
            },
          
          
          };
        }

        componentDidMount(){
          this.setState({
            series:Object.values(this.props.allocation),
            options: {
              labels:Object.keys(this.props.allocation),
              theme: {
                monochrome: {
                    enabled: true,
                },
              },
              
              legend: {
                show: false,
              },
            },
            
          })
        }
      

        render() {
          return (
            <div id="chart">
              <Alert variant="dark">Allocation</Alert>
              <ReactApexChart options={this.state.options} series={this.state.series} type="pie" />
            </div>
          );
        }
      }

export default AllocationChart