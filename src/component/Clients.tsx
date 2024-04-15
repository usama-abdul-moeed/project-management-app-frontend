import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CLIENTS } from '../queries/clientQueries';
import { GET_PROJECTS } from '../queries/projectQueries';
import DeleteIcon from '@mui/icons-material/Delete';
import Spinner from './Spinner';
import { DELETE_CLIENT } from '../mutations/clientMutations';

type Client = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

const Clients: React.FC = () => {
  const { loading, error, data } = useQuery<{ clients: Client[] }>(GET_CLIENTS);

  const [deleteClient] = useMutation(DELETE_CLIENT);

  const handleDeleteClient = async (clientId: number) => {
    try {
      await deleteClient({
        variables: { id: clientId },
        refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
      });
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong</p>;

  return (
    <>
      {data?.clients && data.clients.length > 0 && (
        <div>
          <Typography variant='h4' align='center'>
            Clients
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>{client.name}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.phone}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => {
                          handleDeleteClient(client.id);
                        }}
                      >
                        <DeleteIcon color='error'></DeleteIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  );
};

export default Clients;
