import ApolloClient from 'apollo-boost';

const apolloClient = new ApolloClient({
  // You should use an absolute URL here
  uri: 'https://chatbot-version-11.herokuapp.com/graphql',
});

export default apolloClient;
