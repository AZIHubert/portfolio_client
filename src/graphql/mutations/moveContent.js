import gql from 'graphql-tag';

export default gql`
    mutation moveContent(
        $contentId: ID!
        $index: Int!
    ) {
        moveContent(
            contentId: $contentId
            index: $index
        ) {
            OK
            errors{
                path
                message
            }
            contents{
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