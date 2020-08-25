import gql from 'graphql-tag';

export default gql`
    mutation updateBlock(
        $blockId: ID!
        $size: Int!
    ) {
        updateBlock(
            blockId: $blockId
            size: $size
        ){
            OK
            errors{
                message
                path
            }
            block{
                _id
                index
                size
            }
        }
    }
`;