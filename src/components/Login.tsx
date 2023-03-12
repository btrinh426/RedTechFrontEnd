import React from 'react'
import { Button, Modal, Box } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import MyField from './MyField';

interface Values {
  username: string;
  password: string;
}

interface Props {
  open: boolean;
  close: React.Dispatch<React.SetStateAction<Function>>;
  onSubmit: (values: Values) => void;
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

export const Login: React.FC<Props> = ({ onSubmit, open, close }) => {

  const handleLogin = () => {
    console.log('clicked');
  };

  return (
    <Modal
        open={open}
        onClose={close}
    >
        <Box sx={{ ...style }}>
            <h2 id="parent-modal-title">Login</h2>
            <Formik initialValues={{ username: '', password: '' }} onSubmit={(values) => {
                onSubmit(values)
            }}>
                {({ values, handleChange, handleBlur }) => (
                    <Form>
                        <div>
                            <Field label="Username" name="userName" placeholder="Username" component={MyField} />
                        </div>
                        <div>
                            <Field label="Password" name="password" placeholder="Password" component={MyField} />
                        </div>
                        <Button type="submit" variant="contained" color="primary">Login</Button>
                        <pre>{JSON.stringify(values, null, 2)}</pre>
                    </Form>
                )}
            </Formik>
        </Box>
    </Modal>

  )
}

export default Login