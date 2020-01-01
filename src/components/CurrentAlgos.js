import React,{useState,useEffect} from 'react';
import {Table} from 'react-bootstrap';
import AddAmountModal from './AddAmountModal';
import WithdrawAmountModal from './WithdrawAmountModal';
import AlgoDetailsModal from './AlgoDetailsModal';
import { USDFormat } from '../libs/numberFormat';
import config from '../config';

function CurrentAlgos(props) {
  const [currentAlgos,setCurrentAlgos] = useState([]);
  const [refresh,setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(!{refresh}.refresh);
  }

  useEffect(()=>{
    fetchData();
  },[refresh]);

  const fetchData = async() => {
    console.log("fetching algos")
    fetch(config.apiGateway.URL+'/getalgos')
      .then(response=>response.json())
      .then(data=>{
        console.log(data)
        setCurrentAlgos(data)
      })
  }

  
  return (
    
    <div>
        
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Margin Used</th>
              <th>Amount Allocated</th>
              <th>Profit/Loss</th>
              <th>-</th>
              <th>-</th>
              <th>-</th>
            </tr>
          </thead>
          <tbody>
            
              {currentAlgos.map((item,key)=>(
                <tr key ={key}>
                  <td>{item.name}</td>
                  <td>{USDFormat(item.margin)}</td>
                  <td>{USDFormat(item.amount)}</td>
                  <td>{USDFormat(item.pnl)}</td>
                  <td>
                    
                    <AddAmountModal name={item.name} refresh ={handleRefresh} min={5000} max={props.summary.marginfree}/>
                  </td> 
                  <td>
                    <WithdrawAmountModal name={item.name} refresh ={handleRefresh} min={5000} max={item.amount}/>
                    
                  </td>
                  <td>
                  <AlgoDetailsModal name={item.name} refresh ={handleRefresh} />
                  </td>
                </tr>
                ))}
            
          </tbody>
        </Table>
    </div>
  );
}

export default CurrentAlgos;
