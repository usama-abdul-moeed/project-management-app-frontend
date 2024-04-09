import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const handleProjectClick = () => {
    navigate(`/projects/${id}`);
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
        <Button size='small' onClick={handleProjectClick}>
          See Project Details
        </Button>
      </CardActions>
    </Card>
  );
}
