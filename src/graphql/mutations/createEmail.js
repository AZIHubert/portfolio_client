import gql from 'graphql-tag';

export default gql`
    mutation createEmail(
        $email: String!
        $firstname: String!
        $lastname: String!
        $object: String!
        $body: String!
    ) {
        createEmail(
            email: $email
            firstname: $firstname
            lastname: $lastname
            object: $object
            body: $body
        ){
            OK
            errors{
                message
                path
            }
        }
    }
`;