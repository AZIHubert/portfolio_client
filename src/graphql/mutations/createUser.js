import gql from 'graphql-tag';

export default gql`
    mutation createUser(
        $email: String!
        $username: String!
        $password: String!
        $confirmPassword: String!
        $firstname: String!
        $lastname: String!
        $passwordRegistration: String!
    ) {
        createUser(
            email: $email
            username: $username
            password: $password
            confirmPassword: $confirmPassword
            firstname: $firstname
            lastname: $lastname
            passwordRegistration: $passwordRegistration
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