
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Box, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add'
import { DataGrid } from '@mui/x-data-grid';
import { Formik, Form } from 'formik';

interface Orders {
  id: string,
  creationDate: string,
  createdBy: string,
  orderType: string,
  customerName: string
};

interface MenuItems {
  id: string,
  name: string
}

interface OrderItem {
  orderType: string,
  customerName: string,
  createdByUsername: string,
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const OrdersTable = () => {
  const [orders, setOrders] = useState<Orders[]>([]);
  const [selectedRow, setSelectedRow] = useState<string[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [orderType, setOrderType] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const [createdByUsername, setCreatedByUsername] = useState<string>("");
  const [createOrder, setCreateOrder] = useState<OrderItem>();
  const [menuItems] = useState<MenuItems[]>(
    [
      {
        id: "standardOrder",
        name: "Standard Order"
      },
      {
        id: "purchaseOrder",
        name: "Purchase Order"
      },
      {
        id: "saleOrder",
        name: "Sale Order"
      },
      {
        id: "returnOrder",
        name: "Return Order"
      },
      {
        id: "transferOrder",
        name: "Transfer Order"
      },
    ]
  )
    
    const columns: { field: string, headerName: string, width: number }[] = [
      { field: 'id', headerName: 'Order ID', width: 500 },
      { field: 'createdDate', headerName: 'Creation Date', width: 250 },
      { field: 'createdByUsername', headerName: 'Created By', width: 130 },
      { field: 'orderType', headerName: 'Order Type', width: 130 },
      { field: 'customerName', headerName: 'Customer', width: 130 },
    ];
    
    const handleCloseModal = () => {
      setOpenModal(!openModal);
    };
    
    const handleCreateModal = () => {
      setOpenModal(!openModal);
    };
    
    const handleSubmitOrder = () => {
      setCreateOrder({
        orderType: orderType!,
        customerName: customerName!,
        createdByUsername: createdByUsername!,
      })
      console.log(createOrder);
      axios({
        method: 'post',
        url: 'https://localhost:7294/api/Order/',
        data: createOrder
      })
        .then((response) => {
          if(response.data.success){
            alert(response.data)
          } else {
            alert('something went wrong')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    };

  const handleDeleteOrder = () => {
    console.log(selectedRow[0]);
    axios.delete(`https://localhost:7294/api/Order/${selectedRow[0]}`)
      .then((res) => console.log(res.status))
      .catch((err) => console.log(err))
  };

  const handleSelection = (selected : any) => {
    setSelectedRow(selected);
    console.log(selected);
  };

  const handleCustomerName = (e: React.FormEvent<HTMLInputElement>) => {
    setCustomerName(e.currentTarget.value);
    console.log(customerName);
  };

  const handleCreatedBy = (e: React.FormEvent<HTMLInputElement>) => {
    setCreatedByUsername(e.currentTarget.value);
    console.log(createdByUsername);
  };

  const handleOrderTypeMenu = (e : SelectChangeEvent) => {
    setOrderType(e.target.value);
    console.log(orderType);
  };


  useEffect(() => {
    axios.get(`https://localhost:7294/api/Order/`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err))
  }, []);


  return (
    <>
      <div style={{ height: 400, width: '100%' }}>
        {/* <Button variant="contained" color="primary" startIcon={<DeleteIcon />} onClick={handleDeleteOrder}>DELETE SELECTED</Button>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleCreateModal}>CREATE ORDER</Button> */}
        <Box sx={{ minWidth: 50 }}>
                <FormControl fullWidth>
                  <InputLabel>Order Type</InputLabel>
                  <Select
                    id="orderTypeId"
                    value={orderType}
                    label="OrderTypeLabel"
                    onChange={handleOrderTypeMenu}
                  >
                    {menuItems.map((item) => {
                      return (<MenuItem id={item.id} key={item.id} value={item.id}>{item.name}</MenuItem>)
                    })}
                  </Select>
                </FormControl>
              </Box>
        <DataGrid
          rows={orders}
          columns={columns}
          checkboxSelection
          onRowSelectionModelChange={handleSelection}
          style={{ cursor: "pointer" }}
        />
      </div>
    </>
  );
};

export default OrdersTable;