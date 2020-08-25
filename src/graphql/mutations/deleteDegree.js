import gql from 'graphql-tag';

export default gql`
    mutation deleteDegree(
        $degreeId: ID!
    ) {
        deleteDegree(
            degreeId: $degreeId
        )
    }
`;