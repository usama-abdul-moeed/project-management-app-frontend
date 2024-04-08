import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

type ProjectPropsType = {
  name: string;
  description: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
};

export default function ProjectCard({
  name,
  description,
  status,
}: ProjectPropsType) {
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
        <Button size='small'>See Project Details</Button>
      </CardActions>
    </Card>
  );
}