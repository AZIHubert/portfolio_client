import gql from 'graphql-tag';

export default gql`
    mutation updateImage(
        $imageId: ID!
        $title: String
    ) {
        updateImage(
            imageId: $imageId
            title: $title
        ){
            OK
            errors{
                message
                path
            }
            image{
                _id
                title
                filename
                url
                size
                width
                height
                createdAt
                createdBy{
                    _id
                    username
                }
                works{
                    _id
                    title
                }
                contents{
                    _id
                }
                users{
                    _id
                    username
                }
            }
        }
    }
`;