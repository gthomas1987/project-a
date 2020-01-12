import React from 'react';
import ReactApexChart from 'react-apexcharts';

class AllocationChart extends React.Component {
        constructor(props) {
          super(props);

          this.state = {
          
            series: [],
            options: {
              labels: [],
              chart: {
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
              legend: {
                show: false,
              },
              chart: {
                type: 'donut',
              }
            },
            
          })
        }
      

        render() {
          return (
            <div id="chart">
              <ReactApexChart options={this.state.options} series={this.state.series} type="donut" />
            </div>
          );
        }
      }

export default AllocationChart