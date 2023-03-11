import React, { useState } from 'react';
import { Box, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import OrderTypes from '../json/OrderType.json';

interface Props {
    setFilterOrderType: React.Dispatch<React.SetStateAction<string>>
};

interface MenuItems {
    id: string,
    name: string,
    value: string
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

export const OrderTypeDropdown: React.FC<Props> = ({ setFilterOrderType }) => {
    const [orderType, setOrderType] = useState<string>("")
    const [menuItems] = useState<MenuItems[]>(OrderTypes);

    const handleOrderTypeMenu = (e : SelectChangeEvent) => {
        setFilterOrderType(e.target.value);
        setOrderType(e.target.value);
    };

  return (
    <Box sx={{ minWidth: 200 }}>
        <FormControl fullWidth>
            <InputLabel>Order Type</InputLabel>
            <Select
                id="orderTypeId"
                label="OrderTypeLabel"
                value={orderType}
                onChange={handleOrderTypeMenu}
            >
                {menuItems.map((item) => {
                return (<MenuItem id={item.id} key={item.id} value={item.value}>{item.name}</MenuItem>)
                })}
            </Select>
        </FormControl>
    </Box>
  );
};

export default OrderTypeDropdown;