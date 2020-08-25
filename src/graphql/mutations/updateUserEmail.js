import gql from 'graphql-tag';

export default gql`
    mutation updateUserEmail(
        $userId: ID!
        $email: String!
    ) {
        updateUserEmail(
            userId: $userId
            email: $email
        ){
            OK
            errors{
                message
                path
            }
            user{
                _id
                username
                firstname
                lastname
                email
                createdAt
                updatedAt
                isAdmin
                profilePicture{
                    _id
                    url
                }
            }
        }
    }
`;