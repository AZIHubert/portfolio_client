import gql from 'graphql-tag';

export default gql`
    mutation moveBlock(
        $blockId: ID!
        $index: Int!
    ) {
        moveBlock(
            blockId: $blockId
            index: $index
        ) {
            OK
            errors{
                path
                message
            }
            blocks{
                _id
                index
                size
            }
        }
    }
`;