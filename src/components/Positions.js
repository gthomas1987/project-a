import React,{useState,useEffect} from 'react';
import {Table,Button} from 'react-bootstrap';

function Positions(props) {
  const [people,setPeople] = useState([]);

  useEffect(()=>{
    fetchData();
  },[]);

  const fetchData = async() => {
    fetch('https://swapi.co/api/people/?page=1')
      .then(response=>response.json())
      .then(data=>{
        console.log(data.results)
        setPeople(data.results)
      })
  }

  

  return (
    <div>
        
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Height</th>
              <th>Mass</th>
              <th>Skin Color</th>
              <th>Modify</th>
            </tr>
          </thead>
          <tbody>
            
              {people.map((item,key)=>(
                <tr key ={key}>
                  <td>{item.name}</td>
                  <td>{item.height}</td>
                  <td>{item.mass}</td>
                  <td>{item.skin_color}</td>
                  <td>
                    <Button>Add</Button>
                    <span>    </span>
                    <Button>Withdraw</Button>
                  </td>
                </tr>
                ))}
            
          </tbody>
        </Table>
    </div>
  );
}

export default Positions;
