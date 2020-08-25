import gql from 'graphql-tag';

export default gql`
    mutation createBlock(
        $partId: ID!
        $size: Int!
    ) {
        createBlock(
            partId: $partId
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