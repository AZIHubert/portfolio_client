import gql from 'graphql-tag';

export default gql`
    mutation deleteWorkshop(
        $workshopId: ID!
    ) {
        deleteWorkshop(
            workshopId: $workshopId
        )
    }
`;