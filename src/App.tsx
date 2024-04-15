import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './component/Header';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Home from './pages/Home';
import NotFoundPage from './pages/NotFound';
import Project from './pages/Project';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/projects/:id' element={<Project />}></Route>
            <Route path='*' element={<NotFoundPage />}></Route>
          </Routes>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
