import gql from 'graphql-tag';

export default gql`
    query getDegrees(
        $skip: Int,
        $limit: Int,
        $sort: [DegreeSort!],
        $filter: DegreeFilter
    ) {
        getDegrees(
            skip: $skip,
            limit: $limit
            sort: $sort
            filter: $filter
        ) {
            _id
            city
            degree
            school
            schoolLink
            year
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