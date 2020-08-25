import gql from 'graphql-tag';

export default gql`
    query getUser($userId: ID!){
        getUser(userId: $userId) {
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
`;