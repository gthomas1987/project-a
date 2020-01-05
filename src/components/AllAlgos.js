import React,{useState,useEffect} from 'react';
import {Button,Modal,Table,Row,Col} from 'react-bootstrap';
import AddAmountModal from './AddAmountModal';
import AlgoDetailsModal from './AlgoDetailsModal';
import { USDFormat } from '../libs/numberFormat';
import config from '../config';

function AllAlgos(props) {
  const [currentAlgos,setCurrentAlgos] = useState([]);
  const [refresh,setRefresh] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => {props.refresh();setShow(false);}
  const handleShow = () => {setRefresh(!{refresh}.refresh);setShow(true);}

  const handleRefresh = () => {
    console.log("Calling all algo refresh")
    setRefresh(!{refresh}.refresh);
    props.refresh()
  }

  useEffect(()=>{
    const data = {"userid":props.userid}
    fetch(config.apiGateway.URL+"/getallalgos", {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response=>response.json())
      .then(data=>{
        console.log("Fetching All Algos API")
        setCurrentAlgos(data)
      })
  },[refresh,props.userid,props.refreshDash]);

  
  
  return (
    
    <div>
      <Button variant="info" onClick={handleShow}>
        Add New Algo
      </Button>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount Allocated</th>
              <th>Profit/Loss</th>
            </tr>
          </thead>
          <tbody>
            
              {currentAlgos.map((item,key)=>(
                <tr key ={key}>
                  <td>{item.name}</td>
                  <td>{USDFormat(item.amount)}</td>
                  <td>{USDFormat(item.pnl)}</td>
                  <Row>
                    
                  <Col>
                  <AddAmountModal userid={props.userid} name={item.name} refresh ={handleRefresh} min={5000} max={props.summary.amountfree}/>
                  </Col>  
                  <Col>
                  <AlgoDetailsModal name={item.name} userid={props.userid} refresh ={handleRefresh} />
                  </Col>
                  </Row>
                </tr>
                ))}
            
          </tbody>
        </Table>
        
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        
    </div>
  );
}

export default AllAlgos;
