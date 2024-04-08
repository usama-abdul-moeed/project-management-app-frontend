import Spinner from './Spinner';
import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../queries/projectQueries';
import { Box, Typography, Grid } from '@mui/material';
import ProjectCard from './ProjectCard';

type Project = {
  id: number;
  name: string;
  description: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
};

const Projects: React.FC = () => {
  const { loading, error, data } = useQuery<{ projects: Project[] }>(
    GET_PROJECTS
  );

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong</p>;

  return (
    <Box sx={{ marginTop: '50px' }}>
      <Typography variant='h4' align='center'>
        Projects
      </Typography>
      {data?.projects.length !== 0 ? (
        <Grid container spacing={2} justifyContent='center'>
          {data?.projects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <ProjectCard
                name={project.name}
                description={project.description}
                status={project.status}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <p>No Projects Found</p>
      )}
    </Box>
  );
};

export default Projects;
