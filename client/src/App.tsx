import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Navbar from './components/Navbar';

// Create an HTTP link to your GraphQL server
// The '/graphql' path corresponds to your proxy in vite.config.ts
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Set up authentication link 
// This will add the token to every request
const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  const token = localStorage.getItem('auth_token');

   // Return the headers to the context so httpLink can read them
   return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});

// Initialize Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Combine the auth and http links
  cache: new InMemoryCache(),
});



function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;
