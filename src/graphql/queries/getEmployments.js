import gql from 'graphql-tag';

export default gql`
    query getEmployments(
        $skip: Int,
        $limit: Int,
        $sort: [EmploymentSort!],
        $filter: EmploymentFilter
    ) {
        getEmployments(
            skip: $skip,
            limit: $limit
            sort: $sort
            filter: $filter
        ) {
            _id
            body
            city
            company
            companyLink
            yearFrom
            yearTo
            currentWork
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