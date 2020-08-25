import gql from 'graphql-tag';

export default gql`
    mutation updateWork(
        $workId: ID!
        $title: String
        $date: Int
        $titleColor: String
        $display: Boolean
        $thumbnail: ID
        $types: [ID!]
    ) {
        updateWork(
            workId: $workId
            title: $title
            date: $date
            titleColor: $titleColor
            display: $display
            thumbnail: $thumbnail
            types: $types
        ){
            OK
            errors{
                message
                path
            }
            work{
                _id
                title
                titleColor
                index
                date
                display
                thumbnail{
                    _id
                    url
                }
                parts{
                    _id
                }
                types{
                    _id
                    title
                }
                createdAt
                createdBy{
                    _id
                    username
                    email
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