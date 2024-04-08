import { Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Typography variant='h1' gutterBottom>
        404
      </Typography>
      <Typography variant='h4' gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant='body1' gutterBottom>
        The page you are looking for does not exist.
      </Typography>
      <Button variant='contained' component={Link} to='/' color='primary'>
        Go Back Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
