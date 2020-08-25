import gql from 'graphql-tag';

export default gql`
    mutation moveWork(
        $workId: ID!
        $index: Int!
    ) {
        moveWork(
            workId: $workId
            index: $index
        ) {
            OK
            errors{
                path
                message
            }
            works{
                _id
                title
                titleColor
                index
                date
                display
                thumbnail{
                    _id
                    url
                }
                parts{
                    _id
                }
                types{
                    _id
                    title
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
                }
            }
        }
    }
`;