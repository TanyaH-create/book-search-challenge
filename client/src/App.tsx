import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Navbar from './components/Navbar';
import Auth from './utils/auth'

// Create an HTTP link to your GraphQL server
// The '/graphql' path corresponds to your proxy in vite.config.ts
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Set up authentication link 
// This will add the token to every request
const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  //const token = localStorage.getItem('auth_token');
  const token = Auth.getToken();
   // Return the headers to the context so httpLink can read them
   return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});

// Configure the cache with merge functions
const cache = new InMemoryCache({
  typePolicies: {
    User: {
      fields: {
        savedBooks: {
          merge(existing = [], incoming = []) {
            // Return the incoming array to completely replace the existing one
            // Or implement a more sophisticated merge strategy if needed
            return incoming;
          },
        },
      },
    },
  },
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
