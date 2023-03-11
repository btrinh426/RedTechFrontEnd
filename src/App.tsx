import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrdersTable from './components/OrdersTable';
import CreateOrder from './components/CreateOrder';
import OrderTypeDropdown from './components/OrderTypeDropdown';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

interface Orders {
  customerName: string;
  orderType: string;
  createdByUsername: string;
}

interface Orders {
  id: string,
  creationDate: string,
  createdBy: string,
  orderType: string,
  customerName: string
};

interface Rows {
  id: string
}

function App() {

  const [orders, setOrders] = useState<Orders[]>([]);
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
  const [selectedRows, setSelectedRows] = useState<Rows[]>([]);
  
  const openCreateOrderForm = () => {
    setShowCreateForm(!showCreateForm);
  };

  const handleDeleteOrder = () => {
    axios.delete(`https://localhost:7294/api/Order/${selectedRows}`)
      .then((res) => console.log(res.status))
      .catch((err) => console.log(err))
  };

  const submitNewOrder = async (customerName : string, orderType : string, createdByUsername : string) => {
    const url = 'https://localhost:7294/api/Order/';
    const data = { customerName, orderType, createdByUsername };
    const config = { headers: {'Content-Type': 'application/json'} };

    try{
      const response = await axios.post(url, data, config);
      console.log(response.data);
    } catch {
      console.log('unsuccessful');
    }
  }

  useEffect(() => {
    axios.get(`https://localhost:7294/api/Order/`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err))
  }, []);

  return (
    <>
      <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={openCreateOrderForm}>CREATE ORDER</Button>
      <Button variant="contained" color="primary" startIcon={<DeleteIcon />} onClick={handleDeleteOrder}>DELETE SELECTED</Button>
      <OrderTypeDropdown />
      <div>
        <OrdersTable orders={orders} setSelectedRows={setSelectedRows} />
      </div>'
      <CreateOrder open={showCreateForm} close={openCreateOrderForm} onSubmit={({ customerName, orderType, createdByUsername }) => {
        submitNewOrder(customerName, orderType, createdByUsername)
      }}/>
    </>
    
  );
}

export default App;
