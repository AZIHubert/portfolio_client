import gql from 'graphql-tag';

export default gql`
    query getWorks(
        $skip: Int,
        $limit: Int,
        $sort: [WorkSort!],
        $filter: WorkFilter
    ) {
        getWorks(
            skip: $skip,
            limit: $limit
            sort: $sort
            filter: $filter
        ) {
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
`;