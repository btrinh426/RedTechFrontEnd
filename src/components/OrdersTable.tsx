import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

type Order = {
  id: string,
  creationDate: string,
  createdBy: string,
  orderType: string,
  customerName: string
}

type Rows = {
  id: string
}

interface Props {
  orders: Order[]
  setSelectedRows: React.Dispatch<React.SetStateAction<Rows[]>>
}

export const OrdersTable: React.FC<Props> = ({ orders, setSelectedRows }) => {

    const columns: { field: string, headerName: string, width: number }[] = [
      { field: 'id', headerName: 'Order ID', width: 500 },
      { field: 'createdDate', headerName: 'Creation Date', width: 250 },
      { field: 'createdByUsername', headerName: 'Created By', width: 130 },
      { field: 'orderType', headerName: 'Order Type', width: 130 },
      { field: 'customerName', headerName: 'Customer', width: 130 },
    ];

  const handleSelection = (selectedRow : any) => {
    setSelectedRows(selectedRow);
    console.log(selectedRow);
  };

  return (
    <>
      <div style={{ height: 400, width: '100%' }}>
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