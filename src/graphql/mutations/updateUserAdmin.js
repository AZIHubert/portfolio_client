import gql from 'graphql-tag';

export default gql`
    mutation updateUserAdmin(
        $userId: ID!
        $adminRegistrationPassword: String!
    ) {
        updateUserAdmin(
            userId: $userId
            adminRegistrationPassword: $adminRegistrationPassword
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