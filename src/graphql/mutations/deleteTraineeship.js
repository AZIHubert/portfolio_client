import gql from 'graphql-tag';

export default gql`
    mutation deleteTraineeship(
        $traineeshipId: ID!
    ) {
        deleteTraineeship(
            traineeshipId: $traineeshipId
        )
    }
`;