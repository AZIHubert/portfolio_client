import gql from 'graphql-tag';

export default gql`
    query getImages(
        $skip: Int,
        $limit: Int,
        $sort: [ImageSort!],
    ) {
        getImages(
            skip: $skip,
            limit: $limit,
            sort: $sort,
        ) {
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
`;