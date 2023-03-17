import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: 'https://eu-central-1-shared-euc1-02.cdn.hygraph.com/content/clfb0zgvs2e8l01ue9ivv1on7/master',
  cache: new InMemoryCache(),
});
