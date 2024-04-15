import { useState } from 'react';
import { useMutation } from '@apollo/client';
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
import { GET_PROJECT } from '../queries/projectQueries';
import { UPDATE_PROJECT } from '../mutations/projectMutations';

type Project = {
  id: string;
  name: string;
  description: string;
  status: 'new' | 'progress' | 'completed';
};

type ProjectModalProps = {
  project: Project;
};

const convertValue = (value: string | undefined): string => {
  if (value === 'Not Started') return 'new';
  if (value === 'In Progress') return 'progress';
  if (value === 'Completed') return 'completed';
  return '';
};

const EditProjectModal: React.FC<ProjectModalProps> = ({ project }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState<string>(project.name);
  const [description, setDescription] = useState<string>(project.description);
  const [status, setStatus] = useState<string>(convertValue(project.status));

  const [updateProject, { loading }] = useMutation(UPDATE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateProject = () => {
    updateProject({
      variables: {
        id: project.id,
        name,
        description,
        status,
      },
    }).then(() => {
      handleClose();
    });
  };

  return (
    <Box sx={{ marginTop: '10px' }}>
      <Button variant='contained' onClick={handleOpen}>
        Edit Project
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
            Edit Project
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
              onChange={(e) => setStatus(e.target.value as string)}
              label='Status'
            >
              <MenuItem value='new'>Not Started</MenuItem>
              <MenuItem value='progress'>In Progress</MenuItem>
              <MenuItem value='completed'>Completed</MenuItem>
            </Select>
          </FormControl>
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
              onClick={handleUpdateProject}
              variant='contained'
              color='primary'
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Update'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default EditProjectModal;
