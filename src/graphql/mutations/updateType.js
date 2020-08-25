import gql from 'graphql-tag';

export default gql`
    mutation updateType(
        $typeId: ID!
        $title: String
    ) {
        updateType(
            typeId: $typeId
            title: $title
        ){
            OK
            errors{
                message
                path
            }
            type{
                _id
                title
                works{
                    _id
                }
                createdAt
                createdBy{
                    _id
                    username
                    email
                }
                updatedAt
                updatedBy{
                    _id
                    username
                    email
                }
            }
        }
    }
`;