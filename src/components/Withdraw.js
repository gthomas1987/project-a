import React,{useState,useEffect} from 'react';
import {Modal,Button,Form} from 'react-bootstrap'
import config from '../config';

export function Withdraw(props) {
  
  const [show, setShow] = useState(false);
  const [items, setItems] = useState([]);
  const [amount, setAmount] = useState(5000);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const AmountValue = (e) => setAmount(e.target.value);

  useEffect(()=>{
    const itemsToAdd=[]
    for (var i=props.min;i<=props.max;i=i+5000){
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
      const data = {"userid":props.userid,"amount":{amount}.amount,"action":"withdraw"}
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
      <Button variant="outline-danger" onClick={handleShow}>
        Withdraw
      </Button>
      <Form>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Amount To Withdraw</Form.Label>
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
            Withdraw Amount
          </Button>
        </Modal.Footer>
      </Modal>
      </Form>
    </>
  );
}

