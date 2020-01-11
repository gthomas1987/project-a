import React,{useState,useEffect} from 'react';
import {Button,Modal,Table,Row,Col} from 'react-bootstrap';
import AddAmountModal from './AddAmountModal';
import AlgoDetailsModal from './AlgoDetailsModal';
import { USDFormat } from '../libs/numberFormat';


function AllAlgos(props) {
  const [currentAlgos,setCurrentAlgos] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(()=>{
    setCurrentAlgos(props.allAlgos)
  },[props.userid,props.allAlgos]);

  
  
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
                  <AddAmountModal userid={props.userid} name={item.name}  min={5000} max={props.summary.amountfree} refresh={props.refresh}/>
                  </Col>  
                  <Col>
                  <AlgoDetailsModal name={item.name} details={props.allAlgosDetails} userid={props.userid}  />
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
