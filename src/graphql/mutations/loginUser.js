import gql from 'graphql-tag';

export default gql`
    mutation loginUser(
        $emailOrUsername: String!
        $password: String!
    ) {
        loginUser(
            emailOrUsername: $emailOrUsername
            password: $password
        ){
            OK
            errors{
                message
                path
            }
            token
            refreshToken
        }
    }
`;