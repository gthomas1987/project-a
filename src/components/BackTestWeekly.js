import React,{useEffect,useState} from 'react';

import Chart from "react-apexcharts";

function BackTestWeekly (props) {

  const [options,setOptions] = useState({});
  const [series,setSeries] = useState([]);

  useEffect(()=>{
    setSeries([
        {
          name: 'Weekly PnL',
          data: props.chartValue
        }])
        
    setOptions({
    
          chart: {
            foreColor: '#ffffff',
            type: 'bar',
            height: 350
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '25%',
              endingShape: 'flat'
            },
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },
          xaxis: {
            categories: props.chartKey,
          },
          yaxis: {
            title: {
              text: '$'
            }
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            theme:"dark",
            y: {
              formatter: function (val) {
                return "$ " + val
              }
            }
          }
        })
      },[props.chartKey,props.chartValue]);
      
      

    

  
      return (
        

            <div id="chart">
                <Chart options={options} series={series} type="bar" height={350} />
            </div>


      );
    }
  

  export default BackTestWeekly;