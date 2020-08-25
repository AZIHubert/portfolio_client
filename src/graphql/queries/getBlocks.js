import gql from 'graphql-tag';

export default gql`
    query getBlocks(
        $skip: Int,
        $limit: Int,
        $sort: [BlockSort!],
        $filter: BlockFilter
    ) {
        getBlocks(
            skip: $skip,
            limit: $limit
            sort: $sort
            filter: $filter
        ) {
            _id
            index
            size
        }
    }
`;