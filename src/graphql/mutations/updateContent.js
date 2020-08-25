import gql from 'graphql-tag';

export default gql`
    mutation updateContent(
        $contentId: ID!
        $paddingTop: Int
        $type: String
        $image: ID
        $color: String
        $variant: String
        $textAlign: String
        $body: String
    ) {
        updateContent(
            contentId: $contentId
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
                body
                textAlign
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