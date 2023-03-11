import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrdersTable from './components/OrdersTable';
import CreateOrder from './components/CreateOrder';
import OrderTypeDropdown from './components/OrderTypeDropdown';
import SearchBar from './components/SearchBar';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import styles from './scss/app.module.scss';

interface Orders {
  customerName: string;
  orderType: string;
  createdByUsername: string;
};

interface Orders {
  id: string,
  creationDate: string,
  createdBy: string,
  orderType: string,
  customerName: string
};

const style = {
  Button: {
    // width: 400,
    marginRight: "1rem",
  },
  // BigButton: {
  //   width: 1000,
  // }
};

function App() {

  const [orders, setOrders] = useState<Orders[]>([]);
  // const [filteredOrders, setFilteredOrders] = useState<Orders[]>(orders);
  const [filterOrderType, setFilterOrderType] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  
  const openCreateOrderForm = () => {
    setShowCreateForm(!showCreateForm);
  };

  const handleDeleteOrder = () => {
    axios.delete(`https://localhost:7294/api/Order/${selectedRows}`)
      .then((res) => {
        if(res.status === 204){
          window.location.reload();
        }
      })
      .catch((err) => console.log(err))
  };

  // const filterOrdersByType = () => {
  //   const filtered = filteredOrders.filter((order) => {
  //     return (order.orderType === filterOrderType)
  //   });
  //   console.log(filtered);
  //   setFilteredOrders(filtered);
  // };

  // const filterOrdersBySearch = () => {
  //   const filtered = orders.filter((order) => {
  //     return order.id === searchQuery
  //   });
  //   console.log(filtered);
  //   setFilteredOrders(filtered);
  // };

  const submitNewOrder = async (customerName : string, orderType : string, createdByUsername : string) => {
    const url = `${process.env.REACT_APP_BASE_URL}/api/Order/`;
    const data = { customerName, orderType, createdByUsername };
    const config = { headers: {'Content-Type': 'application/json'} };

    try{
      const response = await axios.post(url, data, config);
      console.log(response);
      if(response.status === 200){
        window.location.reload();
      }
    } catch {
      console.log('unsuccessful');
    }
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/Order/`)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.log(err))
  }, []);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.mainContainer}>
          <div className={styles.buttonContainer}>
            <SearchBar setSearchQuery={setSearchQuery} />
            <Button sx={{ ...style.Button }} variant="contained" color="primary" startIcon={<AddIcon />} onClick={openCreateOrderForm}>CREATE ORDER</Button>
            <Button sx={{ ...style.Button }} variant="contained" color="primary" startIcon={<DeleteIcon />} onClick={handleDeleteOrder}>DELETE SELECTED</Button>
            <OrderTypeDropdown setFilterOrderType={setFilterOrderType} />
          </div>
          <div className={styles.tableContainer}>
            <OrdersTable orders={orders} filter={filterOrderType} setSelectedRows={setSelectedRows} />
          </div>
          <CreateOrder open={showCreateForm} close={openCreateOrderForm} onSubmit={({ customerName, orderType, createdByUsername }) => {
            submitNewOrder(customerName, orderType, createdByUsername)
          }}/>
        </div>
      </div>
    </>
    
  );
}

export default App;
