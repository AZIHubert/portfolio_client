import gql from 'graphql-tag';

export default gql`
    mutation createContent(
        $blockId: ID!
        $paddingTop: Int!
        $type: String!
        $image: ID
        $color: String
        $variant: String
        $textAlign: String
        $body: String
    ) {
        createContent(
            blockId: $blockId
            paddingTop: $paddingTop
            type: $type
            image: $image
            color: $color
            variant: $variant
            textAlign: $textAlign
            body: $body
        ){
            OK
            errors{
                message
                path
            }
            content{
                _id
                index
                paddingTop
                type
                image{
                    _id
                    url
                }
                color
                variant
                textAlign
                body
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
    }
`;