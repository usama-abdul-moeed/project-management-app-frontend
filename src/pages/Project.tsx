import { useParams, Link as RouterLink } from 'react-router-dom';
import Spinner from '../component/Spinner';
import { useQuery } from '@apollo/client';
import { GET_PROJECT } from '../queries/projectQueries';
import { Box, Typography, Divider, Button, Paper } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import EditProjectModal from '../component/EditProjectModal';

const Project = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id } });

  if (loading) return <Spinner />;
  if (error) return <Typography variant='h6'>Something went wrong</Typography>;

  const { project } = data;

  return (
    <>
      {!loading && !error && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            textAlign: 'center',
            padding: '20px',
          }}
        >
          <Typography variant='h4' gutterBottom>
            {project.name}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Paper sx={{ padding: '20px' }}>
            <Typography variant='body1' gutterBottom>
              {project.description}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant='h6' gutterBottom>
              Status:
            </Typography>
            <Typography variant='body1'>{project.status}</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant='h6' gutterBottom>
              Client Information
            </Typography>
            <Typography variant='body1'>Name: {project.client.name}</Typography>
            <Typography variant='body1'>
              Email: {project.client.email}
            </Typography>
            <Typography variant='body1'>
              Phone: {project.client.phone}
            </Typography>
          </Paper>
          <EditProjectModal project={project} />
          <Button
            variant='contained'
            color='primary'
            component={RouterLink}
            to='/'
            startIcon={<ArrowBack />}
            sx={{ marginTop: '20px' }}
          >
            Back
          </Button>
        </Box>
      )}
    </>
  );
};

export default Project;
