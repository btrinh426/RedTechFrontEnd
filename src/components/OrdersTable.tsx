
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Box, MenuList, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add'
import { DataGrid } from '@mui/x-data-grid';

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
  customerName: string,
  orderType: string,
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
  const [customerName, setCustomerName] = useState<string>("");
  const [createdByUsername, setCreatedByUsername] = useState<string>("");
  const [orderType, setOrderType] = useState<string>("");
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
        customerName: customerName!,
        orderType: orderType!,
        createdByUsername: createdByUsername!,
      })
      console.log("hit");
    };

  const handleDeleteOrder = () => {
    console.log(selectedRow[0]);
    axios.delete(`${process.env.SERVER_URL}/api/Order/${selectedRow}`)
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

  const handleClickedMenuItem = (e: React.FormEvent<HTMLInputElement>) => {
    setOrderType(e.currentTarget.id);
    console.log(orderType);
    console.log('hit');
  };


  useEffect(() => {
    axios.get(`${process.env.SERVER_URL}/api/Order/`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err))
  }, []);


  return (
    <>
      <div style={{ height: 400, width: '100%' }}>
        <Button variant="contained" color="primary" startIcon={<DeleteIcon />} onClick={handleDeleteOrder}>DELETE SELECTED</Button>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleCreateModal}>CREATE ORDER</Button>
        <Modal 
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: 400 }}>
            <h2 id="parent-modal-title">Create Order</h2>
            <div id="parent-modal-description">
            <form>
              <label>
                Customer Name:
                <input type="text" name="customerName" value={customerName} onChange={handleCustomerName} />
              </label>
              <label>
                Created By:
                <input type="text" name="createdByUsername" value={createdByUsername} onChange={handleCreatedBy} />
              </label>
              <MenuList>
                Order Type:
                  {menuItems.map((item) => {
                    return (<MenuItem id={item.id} key={item.id} onClick={() => handleClickedMenuItem}>{item.name}</MenuItem>)
                  })}
              </MenuList>
              <Button onClick={handleSubmitOrder} variant="contained" color="primary" startIcon={<AddIcon />}>CREATE ORDER</Button>
            </form>
            </div>
          </Box>
        </Modal>
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