import gql from 'graphql-tag';

export default gql`
    mutation updateUserPassword(
        $userId: ID!
        $oldPassword: String!
        $password: String!
    ) {
        updateUserPassword(
            userId: $userId
            oldPassword: $oldPassword
            password: $password
        ){
            OK
            errors{
                message
                path
            }
            token,
            refreshToken
        }
    }
`;