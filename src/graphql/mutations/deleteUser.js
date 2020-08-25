import gql from 'graphql-tag';

export default gql`
    mutation deleteUser(
        $userId: ID!
        $password: String!
    ) {
        deleteUser(
            userId: $userId
            password: $password
        ) {
            OK
            errors {
                path
                message
            }
        }
    }
`;