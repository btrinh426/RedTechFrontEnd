import React, { useState, useEffect } from 'react';
import { DataGrid, GridFilterModel } from '@mui/x-data-grid';

type Order = {
  id: string,
  creationDate: string,
  createdBy: string,
  orderType: string,
  customerName: string
};

interface Props {
  orders: Order[];
  setSelectedRows: React.Dispatch<React.SetStateAction<string[]>>;
  filter: string;
};

export const OrdersTable: React.FC<Props> = ({ orders, setSelectedRows, filter }) => {

    const columns: { field: string, headerName: string, width: number }[] = [
      { field: 'id', headerName: 'Order ID', width: 500 },
      { field: 'createdDate', headerName: 'Creation Date', width: 250 },
      { field: 'createdByUsername', headerName: 'Created By', width: 130 },
      { field: 'orderType', headerName: 'Order Type', width: 130 },
      { field: 'customerName', headerName: 'Customer', width: 130 },
    ];

    const [filterModel, setFilterModel] = useState<GridFilterModel>({
      items: [
        {
          field: 'orderType',
          operator: 'equals',
          value: ''
        }
      ]
    })

  useEffect(() => {
    setFilterModel({
      items: [{
        field: 'orderType',
        operator: 'equals',
        value: filter
      }]
    });
  }, [filter])

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
          filterModel={filterModel}
          style={{ cursor: "pointer" }}
        />
      </div>
      {console.log(filterModel)}
    </>
  );
};

export default OrdersTable;