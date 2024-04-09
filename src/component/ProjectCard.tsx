import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation } from '@apollo/client';
import { GET_PROJECTS } from '../queries/projectQueries';
import { DELETE_PROJECT } from '../mutations/projectMutations';

type ProjectPropsType = {
  id: number;
  name: string;
  description: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
};

export default function ProjectCard({
  id,
  name,
  description,
  status,
}: ProjectPropsType) {
  const [deleteProject] = useMutation(DELETE_PROJECT);
  const navigate = useNavigate();

  const handleProjectClick = () => {
    navigate(`/projects/${id}`);
  };

  const handleDeleteProject = async (projectId: number) => {
    try {
      await deleteProject({
        variables: { id: projectId },
        refetchQueries: [{ query: GET_PROJECTS }],
      });
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant='h5' component='div'>
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
          {status}
        </Typography>
        <Typography variant='body2'>{description}</Typography>
      </CardContent>
      <CardActions>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button size='small' onClick={handleProjectClick}>
            See Project Details
          </Button>
          <IconButton
            onClick={() => {
              handleDeleteProject(id);
            }}
          >
            <DeleteIcon color='error'></DeleteIcon>
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
}
