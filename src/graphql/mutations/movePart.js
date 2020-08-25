import gql from 'graphql-tag';

export default gql`
    mutation movePart(
        $partId: ID!
        $index: Int!
    ) {
        movePart(
            partId: $partId
            index: $index
        ) {
            OK
            errors{
                path
                message
            }
            parts{
                _id
                index
                backgroundColor
                justifyContent
                alignItems
                disablePaddingSm
                paddingTop
                paddingBottom
                spacing
                createdAt
                createdBy{
                    _id
                    email
                }
                updatedAt
                updatedBy{
                    _id
                    email
                }
            }
        }
    }
`;