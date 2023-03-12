import React, { useState } from 'react';
import { Button, Modal, Box } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import AddIcon from '@mui/icons-material/Add'
import MyField from './MyField';
import OrderTypes from '../json/OrderType.json';

interface Values {
    customerName: string;
    orderType: string;
    createdByUsername: string;
};

interface MenuItems {
    id: string,
    name: string
};

interface Props {
    open: boolean;
    close: React.Dispatch<React.SetStateAction<Function>>
    onSubmit: (values: Values) => void;
};

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

export const CreateOrder: React.FC<Props> = ({ onSubmit, open, close }) => {

    const [menuItems] = useState<MenuItems[]>(OrderTypes);

  return (
    <Modal
        open={open}
        onClose={close}
    >
        <Box sx={{ ...style }}>
            <h2 id="parent-modal-title">Create Order</h2>
            <Formik initialValues={{ customerName: '', orderType: '', createdByUsername: '' }} onSubmit={(values) => {
                onSubmit(values)
            }}>
                {({ values, handleChange, handleBlur }) => (
                    <Form>
                        <div>
                            <Field label="Customer Name" name="customerName" placeholder="Customer Name" component={MyField} />
                        </div>
                        <div>
                            <Field as="select" label="Order Type" name="orderType" placeholder="Order Type">
                                <option disabled value="">Select Order Type</option>
                                {menuItems.map((item) => {
                                    return (
                                        <option key={item.id} value={item.name}>{item.name}</option>
                                    )
                                })}
                            </Field>
                        </div>
                        <div>
                            <Field label="Created By" name="createdByUsername" placeholder="Created By" component={MyField} />
                        </div>
                        <Button type="submit" variant="contained" color="primary" startIcon={<AddIcon />}>Create Order</Button>
                        <pre>{JSON.stringify(values, null, 2)}</pre>
                    </Form>
                )}
            </Formik>
        </Box>
    </Modal>
  )
};

export default CreateOrder;