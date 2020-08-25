import gql from 'graphql-tag';

export default gql`
    mutation deletePart(
        $partId: ID!
    ) {
        deletePart(
            partId: $partId
        )
    }
`;