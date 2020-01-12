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
              title: {
                text: 'Allocation',
                align: 'center',
                margin: 10,
                offsetX: 0,
                offsetY: 0,
                floating: false,
                style: {
                  fontSize:  '24px'
                },
              },
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