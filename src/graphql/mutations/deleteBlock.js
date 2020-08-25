import gql from 'graphql-tag';

export default gql`
    mutation deleteBlock(
        $blockId: ID!
    ) {
        deleteBlock(
            blockId: $blockId
        )
    }
`;