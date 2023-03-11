import React, { useState } from 'react';
import { Box, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

interface Props {

}

interface MenuItems {
    id: string,
    name: string
  }

export const OrderTypeDropdown: React.FC<Props> = () => {
    
    const [orderType, setOrderType] = useState<string>("");
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

    const handleOrderTypeMenu = (e : SelectChangeEvent) => {
    setOrderType(e.target.value);
    console.log(orderType);
    };

  return (
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
  );
};

export default OrderTypeDropdown;