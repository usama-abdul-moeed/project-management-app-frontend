import Header from './component/Header';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Clients from './component/Clients';
import AddClientModal from './component/AddClientModal';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <AddClientModal />
        <Clients />
      </ApolloProvider>
    </>
  );
}

export default App;
