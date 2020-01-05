import React,{useState,useEffect} from 'react';
import {Modal,Button,Form} from 'react-bootstrap'
import config from '../config';


export function Deposit(props) {
  
  const [show, setShow] = useState(false);
  const [items, setItems] = useState([]);
  const [amount, setAmount] = useState(5000);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const AmountValue = (e) => setAmount(e.target.value);
  

  useEffect(()=>{
    const itemsToAdd=[]
    for (var i=props.min;i<=props.max;i=i+props.min){
      itemsToAdd.push(i)
    }
    setItems(itemsToAdd)
  },[props.max,props.min]);
  
  
  const handleAdd = (event) => {
    event.preventDefault();
    setShow(false)
    UpdateCash();
    props.refresh()
  }
  

  const UpdateCash = async() => {
    try {
      const data = {"userid":props.userid,"amount":{amount}.amount,"action":"add"}
      await fetch(config.apiGateway.URL+'/updateCash', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
    }
  }
  

  return (
    <>
      <Button variant="outline-success" onClick={handleShow}>
        Deposit
      </Button>
      <Form>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Amount To Deposit</Form.Label>
            <Form.Control onChange = {AmountValue} as="select">
              {items.map((item,key)=>(
                <option key={key}>{item}</option>
              ))}
              
            </Form.Control>
          </Form.Group>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type = "submit"variant="primary" onClick={handleAdd}>
            Add Amount
          </Button>
        </Modal.Footer>
      </Modal>
      </Form>
    </>
  );
}

