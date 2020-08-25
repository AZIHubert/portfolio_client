import gql from 'graphql-tag';

export default gql`
    query getContents(
        $skip: Int,
        $limit: Int,
        $sort: [ContentSort!],
        $filter: ContentFilter
    ) {
        getContents(
            skip: $skip,
            limit: $limit
            sort: $sort
            filter: $filter
        ) {
            _id
            index
            paddingTop
            type
            image{
                _id
                url
            }
            color
            variant
            body
            textAlign
            createdAt
            createdBy{
                _id
                username
            }
            updatedAt
            updatedBy{
                _id
                username
            }
        }
    }
`;