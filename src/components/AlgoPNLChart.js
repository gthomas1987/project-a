import React,{useEffect,useState} from 'react';
//import ApexCharts from 'apexcharts'

import Chart from "react-apexcharts";

function AlgoPNLChart(props){

  const [options,setOptions] = useState({});
  const [series,setSeries] = useState([]);

  useEffect(()=>{
    
    setOptions({
      dataLabels: {
        enabled: false
      },
      chart: {
        zoom: {
            enabled: true,
            type: 'x',  
            autoScaleYaxis: false,  
            zoomedArea: {
              fill: {
                color: '#90CAF9',
                opacity: 0.4
              },
              stroke: {
                color: '#0D47A1',
                opacity: 0.4,
                width: 1
              }
            }
        }
      },
      xaxis:{
        type: 'datetime',
        labels: {
          formatter: function (value, timestamp) {
            return new Date(timestamp) // The formatter function overrides format property
          }, 
        }
      },
      yaxis: [
        {
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: "#FF1654"
          },
          labels: {
            style: {
              color: "#FF1654"
            }
          },
          title: {
            text: "Series A"
          }
        },
        {
          opposite: true,
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: "#247BA0"
          },
          labels: {
            style: {
              color: "#247BA0"
            }
          },
          title: {
            text: "Series B"
          }
        }
      ],

      })
    setSeries([
      {
        name: "PNL",
        data: props.pnlchart
      },
      {
        name: "Diff",
        data: props.diffchart
      }
    ])
  },[props.pnlchart,props.diffchart]);


  
    return (
      <div className="app">
        <div >
          <div className="mixed-chart">
            <Chart
              options={options}
              series={series}
              type="line"
              width="100%"
            />
          </div>
        </div>
      </div>
    );
  }


export default AlgoPNLChart;
