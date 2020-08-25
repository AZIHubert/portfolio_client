import gql from 'graphql-tag';

export default gql`
    query getTraineeships(
        $skip: Int,
        $limit: Int,
        $sort: [TraineeshipSort!],
        $filter: TraineeshipFilter
    ) {
        getTraineeships(
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