import gql from 'graphql-tag';

export default gql`
    mutation createImage(
        $upload: Upload!
    ) {
        createImage(
            upload: $upload
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
                width
                height
                size
                url
                createdBy{
                    _id
                    username
                }
                createdAt
                works{
                    _id
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