const fetch = require('node-fetch');
const { createHttpLink } = require('apollo-link-http');
const { InMemoryCache } = require('apollo-cache-inmemory');
const { ApolloClient } = require('apollo-client');

require('dotenv').config({ path: '.env' });

const httpLink = createHttpLink({
  uri: 'http://localhost:8080/v1/graphql',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  fetch
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    addTypename: false
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore'
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all'
    }
  }
});

module.exports = client;
