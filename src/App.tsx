import React, { useState } from 'react';
import OrdersTable from './components/OrdersTable';
import CreateOrder from './components/CreateOrder';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

function App() {

  const [showCreateForm, setShowCreateForm] = useState(false);
  
  const openCreateOrderForm = () => {
    setShowCreateForm(!showCreateForm);
  };

  const handleDeleteOrder = () => {
    // console.log(selectedRow[0]);
    // axios.delete(`https://localhost:7294/api/Order/${selectedRow[0]}`)
    //   .then((res) => console.log(res.status))
    //   .catch((err) => console.log(err))
  };

  return (
    <>
      <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={openCreateOrderForm}>CREATE ORDER</Button>
      <Button variant="contained" color="primary" startIcon={<DeleteIcon />} onClick={handleDeleteOrder}>DELETE SELECTED</Button>
      <div>
        <OrdersTable />
      </div>
      <CreateOrder open={showCreateForm} close={openCreateOrderForm} onSubmit={({ customerName, orderType, createdByUsername }) => {
        console.log(customerName, orderType, createdByUsername)
      }}/>
    </>
    
  );
}

export default App;
