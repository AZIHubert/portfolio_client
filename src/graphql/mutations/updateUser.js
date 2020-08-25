import gql from 'graphql-tag';

export default gql`
    mutation updateUser(
        $userId: ID!
        $username: String
        $firstname: String
        $lastname: String
        $profilePicture: ID
    ) {
        updateUser(
            userId: $userId
            username: $username
            firstname: $firstname
            lastname: $lastname
            profilePicture: $profilePicture
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