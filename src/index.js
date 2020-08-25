import "regenerator-runtime/runtime";
import React from 'react';
import ReactDOM from 'react-dom';

import App from '#components/App';

import ApolloProvider from './ApolloProvider';

ReactDOM.render(<ApolloProvider>
    <App />
</ApolloProvider>, document.getElementById('root'));