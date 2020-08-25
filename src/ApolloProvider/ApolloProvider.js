import React from 'react';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';

const httpLink = createUploadLink({
    uri: 'https://fast-scrubland-94997.herokuapp.com/graphql'
});

const authMiddlewareLink = setContext(() => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    return {
        headers: {
            'x-token': token ? token : '',
            'x-refresh-token': refreshToken ? refreshToken : ''
        }
    };
});

const afterwareLink = new ApolloLink((operation, forward) =>
    forward(operation).map(response => {
        const context = operation.getContext();
        const { response: { headers } } = context;
        if (headers) {
            const token = headers.get('x-token');
            const refreshToken = headers.get('x-refresh-token');
            if (token) localStorage.setItem('x-token', token);
            if (refreshToken) localStorage.setItem('x-refresh-token', refreshToken);
        }
        return response;
  }),
);

let links = [authMiddlewareLink, afterwareLink, httpLink];
const link = ApolloLink.from(links);

const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
});


export default ({ children }) => <ApolloProvider client={client}>
    {children}
</ApolloProvider>