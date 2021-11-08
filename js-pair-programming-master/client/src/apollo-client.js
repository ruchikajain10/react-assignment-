import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: `http://localhost:${process.env.REACT_APP_SERVER_PORT || 5009}/graphql`,
});

export default client;
