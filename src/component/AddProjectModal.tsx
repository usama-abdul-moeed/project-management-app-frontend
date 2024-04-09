import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  Button,
  Modal,
  Box,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from '@mui/material';
import { GET_CLIENTS } from '../queries/clientQueries';
import { ADD_PROJECT } from '../mutations/projectMutations';
import { GET_PROJECTS } from '../queries/projectQueries';

type Client = {
  id: string;
  name: string;
};

type ProjectStatus = 'new' | 'progress' | 'completed';

const AddProjectModal: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [status, setStatus] = useState<ProjectStatus>('new');
  const [clientId, setClientId] = useState<string>('');
  const [error, setError] = useState<string>('');

  const { loading: clientsLoading, data: clientsData } = useQuery<{
    clients: Client[];
  }>(GET_CLIENTS);
  const [addProject, { loading: addProjectLoading }] = useMutation(
    ADD_PROJECT,
    {
      refetchQueries: [{ query: GET_PROJECTS }],
    }
  );

  const handleOpen = () => {
    setOpen(true);
    setError('');
  };

  const handleClose = () => {
    setOpen(false);
    setError('');
    setName('');
    setDescription('');
    setStatus('new');
    setClientId('');
  };

  const handleAddProject = () => {
    if (!name || !description || !status || !clientId) {
      setError('All fields are required');
      return;
    }

    addProject({
      variables: {
        name,
        description,
        status,
        clientId,
      },
    }).then(() => {
      handleClose();
    });
  };

  return (
    <Box sx={{ marginTop: '10px' }}>
      <Button variant='contained' onClick={handleOpen}>
        Add Project
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            minWidth: 300,
            maxWidth: 600,
            width: '90%',
            outline: 'none',
          }}
        >
          <Typography variant='h5' gutterBottom>
            Add New Project
          </Typography>
          <TextField
            label='Name'
            variant='outlined'
            fullWidth
            margin='normal'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label='Description'
            variant='outlined'
            fullWidth
            margin='normal'
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <FormControl fullWidth margin='normal' variant='outlined' required>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value as ProjectStatus)}
              label='Status'
            >
              <MenuItem value='new'>Not Started</MenuItem>
              <MenuItem value='progress'>In Progress</MenuItem>
              <MenuItem value='completed'>Completed</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin='normal' variant='outlined' required>
            <InputLabel>Client</InputLabel>
            <Select
              value={clientId}
              onChange={(e) => setClientId(e.target.value as string)}
              label='Client'
            >
              {clientsLoading ? (
                <MenuItem disabled>
                  <CircularProgress size={24} />
                </MenuItem>
              ) : (
                clientsData?.clients.map((client) => (
                  <MenuItem key={client.id} value={client.id}>
                    {client.name}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
          <Typography variant='body2' color='error'>
            {error}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '20px',
            }}
          >
            <Button onClick={handleClose} sx={{ marginRight: '10px' }}>
              Cancel
            </Button>
            <Button
              onClick={handleAddProject}
              variant='contained'
              color='primary'
              disabled={addProjectLoading}
            >
              {addProjectLoading ? <CircularProgress size={24} /> : 'Add'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default AddProjectModal;
