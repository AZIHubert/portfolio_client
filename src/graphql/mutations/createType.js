import gql from 'graphql-tag';

export default gql`
    mutation createType(
        $title: String!
    ) {
        createType(
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