import { Box, CircularProgress } from '@mui/material';

const Spinner: React.FC = () => {
  return (
    <>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='100vh'
      >
        <CircularProgress />
      </Box>
    </>
  );
};

export default Spinner;
