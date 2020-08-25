import gql from 'graphql-tag';

export default gql`
    query getWorkshops(
        $skip: Int,
        $limit: Int,
        $sort: [WorkshopSort!],
        $filter: WorkshopFilter
    ) {
        getWorkshops(
            skip: $skip,
            limit: $limit
            sort: $sort
            filter: $filter
        ) {
            _id
            artist
            artistLink
            body
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