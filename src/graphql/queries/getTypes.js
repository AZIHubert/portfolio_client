import gql from 'graphql-tag';

export default gql`
    query getTypes(
        $skip: Int,
        $limit: Int,
        $sort: [TypeSort!],
        $filter: TypeFilter
    ) {
        getTypes(
            skip: $skip,
            limit: $limit
            sort: $sort
            filter: $filter
        ) {
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
`;