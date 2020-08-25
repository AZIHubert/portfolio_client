import gql from 'graphql-tag';

export default gql`
    mutation deleteType(
        $typeId: ID!
    ) {
        deleteType(
            typeId: $typeId
        )
    }
`;