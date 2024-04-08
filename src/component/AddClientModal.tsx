import { useState, ChangeEvent, FormEvent } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { ADD_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';
import { useMutation } from '@apollo/client';

type FormData = {
  name: string;
  email: string;
  phone: string;
};

export default function AddClientModal() {
  const [open, setOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
  });

  const [addClient] = useMutation(ADD_CLIENT);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    const { name, email, phone } = formData;
    await addClient({
      variables: { name, email, phone },
      refetchQueries: [{ query: GET_CLIENTS }],
    });
    handleClose();
  };

  return (
    <Box sx={{ marginTop: '10px' }}>
      <Button variant='contained' onClick={handleOpen}>
        Add Client
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            maxWidth: 400,
            width: '90%',
          }}
        >
          <form onSubmit={handleSubmit}>
            <TextField
              label='Name'
              variant='outlined'
              fullWidth
              margin='normal'
              name='name'
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              label='Email'
              variant='outlined'
              fullWidth
              margin='normal'
              name='email'
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              label='Phone'
              variant='outlined'
              fullWidth
              margin='normal'
              name='phone'
              value={formData.phone}
              onChange={handleChange}
            />
            <Button type='submit' variant='contained' color='primary'>
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
}
