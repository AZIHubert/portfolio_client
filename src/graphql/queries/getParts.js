import gql from 'graphql-tag';

export default gql`
    query getParts(
        $skip: Int,
        $limit: Int,
        $sort: [PartSort!],
        $filter: PartFilter
    ) {
        getParts(
            skip: $skip,
            limit: $limit
            sort: $sort
            filter: $filter
        ) {
            _id
            index
            backgroundColor
            disableBackground
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
`;